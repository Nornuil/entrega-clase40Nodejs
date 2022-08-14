const os = require("os");
module.exports =  class InfoDelSistema{

    creaObjetoInfo(){
        return {
            carpeta_proyecto:process.cwd(),
            path_ejecucion:process.execPath,
            plataforma:process.platform,
            argumentos:process.argv.slice(2),
            version_node:process.version,
            process_id:process.pid,
            memoria_total:process.memoryUsage().rss,
            procesadores_presentes:os.cpus().length,
        };
    }
}