import React from 'react';
import { DecoratorNode } from 'lexical';

// Simple serialized shape for this node
// { type: 'image', version: 1, src: string, altText?: string }

export class ImageNode extends DecoratorNode {
  /**
   * @param {string} src
   * @param {string} altText
   * @param {import('lexical').NodeKey} [key]
   */
  constructor(src, altText = '', key) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  // --- Static methods ---

  static getType() {
    return 'image';
  }

  /**
   * @param {ImageNode} node
   */
  static clone(node) {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  /**
   * @param {{type: string, version: number, src: string, altText?: string}} serializedNode
   */
  static importJSON(serializedNode) {
    const { src, altText = '' } = serializedNode;
    return new ImageNode(src, altText);
  }

  exportJSON() {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
    };
  }

  // --- DOM / React rendering ---

  createDOM() {
    // Lexical will render the React element returned from decorate()
    // into this container; it doesn't need styling itself.
    const span = document.createElement('span');
    return span;
  }

  updateDOM() {
    // No need to update the container DOM; React handles updates.
    return false;
  }

  decorate() {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{ maxWidth: '100%', height: 'auto', margin: '0.5rem 0' }}
      />
    );
  }
}

/**
 * Helper to create an ImageNode
 * @param {{src: string, altText?: string}} params
 */
export function $createImageNode({ src, altText = '' }) {
  return new ImageNode(src, altText);
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}
