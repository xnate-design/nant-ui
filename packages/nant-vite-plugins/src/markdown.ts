import type { Plugin, ResolvedConfig, Rollup, UserConfig } from 'vite';
import { compile } from '@mdx-js/mdx';

import { visit } from 'unist-util-visit';
import remarkGfm from 'remark-gfm';
import remarkFrontMatter from 'remark-frontmatter';
import externalLinks from 'remark-external-links';
import images from 'remark-images';
import unrwapImages from 'remark-unwrap-images';

import { SourceMapGenerator } from 'source-map';
import { VFile, Compatible, VFileCompatible } from 'vfile';
import { createFilter } from '@rollup/pluginutils';
import { createFormatAwareProcessors } from '@mdx-js/mdx/lib/util/create-format-aware-processors.js';

export type CompileOptions = Omit<import('@mdx-js/mdx').CompileOptions, 'SourceMapGenerator'>;
/**
 * Extra configuration.
 */
export type RollupPluginOptions = {
  /**
   * List of picomatch patterns to include
   */
  include?: import('@rollup/pluginutils').FilterPattern | undefined;
  /**
   * List of picomatch patterns to exclude
   */
  exclude?: import('@rollup/pluginutils').FilterPattern | undefined;
};
/**
 * Configuration.
 */
export type Options = CompileOptions & RollupPluginOptions;

function rehypeMetaAsAttributes() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        node.properties.meta = node.data.meta;
      }
    });
  };
}

export const nantMdx = (options?: Options): Plugin => {
  const remarkPlugins = [remarkGfm, remarkFrontMatter, externalLinks, images, unrwapImages];
  const rehypePlugins = [rehypeMetaAsAttributes];

  const { include, exclude, ...rest } = options || {};
  const { extnames, process } = createFormatAwareProcessors({
    SourceMapGenerator,
    remarkPlugins,
    rehypePlugins,
    ...rest,
  });
  const filter = createFilter(include, exclude);
  return {
    name: 'vite-plugin-nant-mdx',
    enforce: 'pre',
    async transform(value, path) {
      const file: any = new VFile({ value, path });

      if (file.extname && filter(file.path) && extnames.includes(file.extname)) {
        const compiled = await process(file);
        const code = String(compiled.value);
        const result = { code, map: compiled.map };
        console.log(result, 'result:');

        return result;
      }
    },
  };
};
