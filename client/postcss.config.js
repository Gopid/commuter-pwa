module.exports = (ctx) => {
    return {
        parser: ctx.parser ? 'sugarss' : false,
        map: ctx.env === 'development' ? ctx.map : false,
        plugins: {
            autoprefixer: ctx.env === 'production',
            cssnano: ctx.env === 'production' ? {} : false
        }
    }
}