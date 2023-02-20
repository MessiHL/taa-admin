/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-15 15:15:06
 * @LastEditors: hl
 * @LastEditTime: 2022-07-15 15:17:24
 */
import { computed, unref, defineComponent } from "vue";
import "./resizer.css";

export default defineComponent({
	name: "Resizer",
	props: {
		split: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ""
		}
	},
	setup(props) {
		const classes = computed(() => {
			return ["splitter-pane-resizer", props.split, props.className].join(" ");
		});

		return () => <div class={unref(classes)}></div>;
	}
});
