import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import vueJsx from "@vitejs/plugin-vue-jsx";
import importToCDN from "vite-plugin-cdn-import";
import { viteMockServe } from "vite-plugin-mock";
// @see: https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		base: viteEnv.VITE_BASE_ROUTE,
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		// global css
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// https: false,
			// 代理跨域（mock 不需要配置，这里只是个事列）
			proxy: {
				"/geeker": {
					target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/geeker/, "")
				},
				"/admin": {
					target: "http://192.168.1.7:18081",
					changeOrigin: true
				},
				"/one-card-pass-server": {
					target: "http://192.168.1.7:18080", // http://192.168.1.7:18080
					changeOrigin: true,
					rewrite: path => path.replace(/^\/one-card-pass-server/, "")
				},
				"/ocp-rule-server": {
					target: "http://192.168.1.7:18082", // http://192.168.1.7:18080
					changeOrigin: true,
					rewrite: path => path.replace(/^\/ocp-rule-server/, "")
				}
			}
		},
		// plugins
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			viteMockServe({
				mockPath: "mock", // 解析，路径可根据实际变动,此处会读取 mock/index
				localEnabled: command === "serve"
			}),
			// * EsLint 报错信息显示在浏览器界面上
			//eslintPlugin(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend(),

			importToCDN({
				modules: []
			}),
			// * 是否生成包预览
			viteEnv.VITE_REPORT && visualizer(),
			viteCompression({ filter: () => true })
		],
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		// build configure
		build: {
			outDir: "dist",
			// esbuild 打包更快，但是不能去除 console.log
			minify: "esbuild",
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			rollupOptions: {
				manualChunks(id) {
					// 分包
					if (id.includes("node_modules")) {
						return id.toString().split("node_modules/")[1].split("/")[0].toString();
					}
				},
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
