import { defineComponent } from "vue"

export default defineComponent({
  name: 'CurrentInput',
  props: {
    val: {
      type: String,
      required: true
    },

  },
  emits: ['update:val'],
  setup(props, {emit}) {
    return () => (
      <input value={props.val} onInput={e => {
        const value = (e.target as HTMLInputElement).value;
        if (props.val !== value) {
          emit('update:val', value)
        }
      }} />
    )
  }
})