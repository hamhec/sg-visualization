import { Graph, Edge, Node, Layout } from '../model';

import { Observable, of } from 'rxjs';

import * as dagre from 'dagre';


export enum Orientation {
  LEFT_TO_RIGHT = 'LR',
  RIGHT_TO_LEFT = 'RL',
  TOP_TO_BOTTOM = 'TB',
  BOTTOM_TO_TOM = 'BT'
}

export enum Alignment {
  CENTER = 'C',
  UP_LEFT = 'UL',
  UP_RIGHT = 'UR',
  DOWN_LEFT = 'DL',
  DOWN_RIGHT = 'DR',
}

export interface DagreSettings {
  orientation?: Orientation;
  marginX?: number;
  marginY?: number;
  edgePadding?: number;
  rankPadding?: number;
  nodePadding?: number;
  align?: Alignment;
  acyclicer?: 'greedy' | undefined;
  ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
}

export class DagreLayout implements Layout {
  defaultSettings: DagreSettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
    marginX: 20,
    marginY: 20,
    edgePadding: 100,
    rankPadding: 100,
    nodePadding: 50,
    ranker: 'network-simplex',
  };
  settings: DagreSettings = {};

  dagreGraph: any;
  dagreNodes: any;
  dagreEdges: any;

  run(graph: Graph): Observable<Graph> {
    this.createDagreGraph(graph);
    console.log(this.dagreGraph);
    dagre.layout(this.dagreGraph);

    // applying the computes positions and points to the graph nodes and edges
    this.dagreGraph.nodes().forEach(v => {
      const dagreNode = this.dagreGraph.node(v);
      const node = graph.nodes.find(n => n.id === dagreNode.id);
      node.position = {
        x: dagreNode.x,
        y: dagreNode.y
      };
      node.dimension = {
        width: dagreNode.width,
        height: dagreNode.height
      };
    })

    this.dagreGraph.edges().forEach(l => {
      console.log(l);
      const dagreEdge = this.dagreGraph.edge(l);
      console.log(dagreEdge);
      const edge = graph.edges.find(e => (e.id === l.name));
      edge.points = dagreEdge.points;
    });
    return of(graph);
  }

  createDagreGraph(graph: Graph): any {
    this.dagreGraph = new dagre.graphlib.Graph({ multigraph: true });
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
    });

    // Default to assigning a new object as a label for each new edge.
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {};
    });

    this.dagreNodes = graph.nodes.map(n => {
      const node: any = Object.assign({}, n);
      node.width = n.dimension.width;
      node.height = n.dimension.height;
      node.x = n.position.x;
      node.y = n.position.y;
      return node;
    });

    this.dagreEdges = graph.edges.map(l => {
      const newLink: any = Object.assign({}, l);
      return newLink;
    });

    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }

      // update dagre
      this.dagreGraph.setNode(node.id, node);
    }

    // update dagre
    for (const edge of this.dagreEdges) {
      this.dagreGraph.setEdge(edge.source, edge.target, {}, edge.id);
    }

    return this.dagreGraph;
  }

  updateEdge(graph: Graph, edge: Edge): Observable<Graph> {
    // TODO: this updates the edge as a direct line, make it a multipoint edge
    const sourceNode = graph.nodes.find(n => n.id === edge.source);
    const targetNode = graph.nodes.find(n => n.id === edge.target);

    // determine new arrow position
    const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
    const startingPoint = {
      x: sourceNode.position.x,
      y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2)
    };
    const endingPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + dir * (targetNode.dimension.height / 2)
    };

    // generate new points
    edge.points = [startingPoint, endingPoint];
    return of(graph);
  }
}
