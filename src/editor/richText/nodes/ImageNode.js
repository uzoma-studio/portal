import React from 'react';
import { DecoratorNode } from 'lexical';

// Simple serialized shape for this node
// { type: 'image', version: 1, src: string, altText?: string, size?: 'small' | 'medium' | 'large' }

export class ImageNode extends DecoratorNode {
  /**
   * @param {string} src
   * @param {string} altText
   * @param {'small' | 'medium' | 'large'} size
   * @param {import('lexical').NodeKey} [key]
   */
  constructor(src, altText = '', size = 'medium', key) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__size = size;
  }

  // --- Static methods ---

  static getType() {
    return 'image';
  }

  /**
   * @param {ImageNode} node
   */
  static clone(node) {
    return new ImageNode(node.__src, node.__altText, node.__size, node.__key);
  }

  /**
   * @param {{type: string, version: number, src: string, altText?: string, size?: 'small' | 'medium' | 'large'}} serializedNode
   */
  static importJSON(serializedNode) {
    const { src, altText = '', size = 'medium' } = serializedNode;
    return new ImageNode(src, altText, size);
  }

  exportJSON() {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
      size: this.__size,
    };
  }

  getSize() {
    return this.__size;
  }

  /**
   * @param {'small' | 'medium' | 'large'} size
   */
  setSize(size) {
    const writable = this.getWritable();
    writable.__size = size;
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
    let maxWidth = '100%';
    if (this.__size === 'small') {
      maxWidth = '25%';
    } else if (this.__size === 'medium') {
      maxWidth = '50%';
    } else if (this.__size === 'large') {
      maxWidth = '100%';
    }

    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{ maxWidth, height: 'auto', margin: '0.5rem 0', display: 'block' }}
      />
    );
  }
}

/**
 * Helper to create an ImageNode
 * @param {{src: string, altText?: string, size?: 'small' | 'medium' | 'large'}} params
 */
export function $createImageNode({ src, altText = '', size = 'medium' }) {
  return new ImageNode(src, altText, size);
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}
