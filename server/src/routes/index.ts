import configRoutes from "./config"
import executeRoutes from "./execute"

export default {
    config: {
        type: 'admin',
        routes: configRoutes
    },
    execute: {
        type: 'admin',
        routes: executeRoutes
    }
}