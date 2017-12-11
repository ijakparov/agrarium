const agrarium = require('.');
const miss = require('mississippi');

const ComponentsCollector = require('./plugins/agrarium-components-collector');
const JSDoc = require('./plugins/agrarium-jsdoc');
const Markdown = require('./plugins/agrarium-markdown');

const xjstBuilder = require('./builders/agrarium-xjst');

agrarium({
    src: [
        'node_modules/bem-components/common.blocks',
        'node_modules/bem-components/touch.blocks',
        'node_modules/bem-components/desktop.blocks',
        'node_modules/bem-components/design/common.blocks',
        'node_modules/bem-components/design/desktop.blocks'
    ],
    plugins: [
        new ComponentsCollector(/* settings */),
        new JSDoc(/* settings */),
        new Markdown({
            inlineExamplesLangs: ['js', 'bemjson']
        })
    ]
})
    .on('error', console.error)
    // .pipe(miss.through.obj(function (data, _, cb) {
    //     if (process.env.FILTER) {
    //         process.env.FILTER === data.chunk.key && this.push(data);
    //         cb();
    //         return;
    //     };
    //     cb(null, data);
    // }))
    // .on('data', ({ chunk, context, result }) => console.log(chunk.key, chunk.data, Object.assign({}, context, {components: undefined})))
    // .on('data', console.log)
    .pipe(xjstBuilder({
        levels: {
            'node_modules/bem-core/common.blocks': {},
            'node_modules/bem-core/desktop.blocks': {},
            'node_modules/bem-components/common.blocks': {},
            'node_modules/bem-components/desktop.blocks': {},
            'node_modules/bem-components/design/common.blocks': {},
            'node_modules/bem-components/design/desktop.blocks': {},
        },
        i18n: {
            default: 'en',
            langs: ['ru', 'en', 'uk']
        },
        // buildOptions,
        // levels: ['blocks', 'name.blocks']
        output: './out'
    }))
    .on('error', console.error);
