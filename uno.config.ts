import { defineConfig } from 'unocss'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        //属性样式
        presetAttributify(),
        //预设写法
        presetUno(),
    ],
    rules: [
        ['border', { 'border': '1px solid #666' }],


    ],
    shortcuts: [
        {
            'flex-center': 'flex justify-center items-center',
        },
    ]
})