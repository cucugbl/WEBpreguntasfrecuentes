import {Controller, Get, HttpCode, Req, Res} from "@nestjs/common";

const fs = require('fs');
const nombre = 'Gabriel macias ';
/*
En el controlador de Inicio crear un método en la clase que apunte a la URL "Home" que acepte request con el parámetro
"GET" que responda un status code "200" si tod sale bien
o "500" si existen errores.
Para mostrar el contenido debe hacer lo siguiente:
 i.	Lea un archivo llamado footer.html
ii.	Lea un archivo llamado header.html
iii.	Lea un archivo llamado contenido.html
iv.	Colocar el contenido del header, luego contenido, luego footer en una variable y devolverla al cliente
v.	USE las llamadas asyncronas del módulo "fs" con el método "readFile" de nodejs.
*/

@Controller()
export class InicioController {
    @Get('Home')
    buscarHtml(@Req() req, @Res() res){
        let htmlFooter=fs.readFileSync(
            __dirname+'/html/footer.html',
            'utf8');
        let htmlHeader= fs.readFileSync(
            __dirname+'/html/header.html',
            'utf8');
        let htmlContenido= fs.readFileSync(
            __dirname+'/html/contenido.html',
            'utf8');
        htmlContenido = htmlContenido.replace('{{nombre}}',nombre);

        let contenidoTotal= htmlHeader + htmlContenido + htmlFooter;
        // Modificación para status
        /*console.log(res.status(200).send(contenidoTotal));
        return res.status(200).send(contenidoTotal);*/

        const existeContenido = (contenidoTotal);

        // Todo sale bien
        if(existeContenido) {
            console.log(res.status(200).send(contenidoTotal));
            return res.status(200).send(contenidoTotal);
        }else {
            return res.status(500).send({mensaje: 'Existen errores', status: 500})
        }
        // Retorna error
        /*if(existeContenido==null) {
            console.log(res.status(200).send(contenidoTotal));
            return res.status(200).send(contenidoTotal);
        }else {
            return res.status(500).send({mensaje: 'Existen errores', status: 500})
        }*/
    }
}