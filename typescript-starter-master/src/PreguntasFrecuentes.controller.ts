import {Body, Controller, Get, Post,Res,Req} from "@nestjs/common";
import {} from "./PreguntaFrecuente";

const fs =require('fs');
let htmlPregFre=fs.readFileSync(__dirname+'/html/preguntasFrecuentes.html', 'utf8');

let contador = 0;

@Controller()
export class PreguntasFrecuentesController {

    propiedadesPreguntas: PreguntaFrecuente[] = []
    @Post('anadir')
    anadirPreguntas(@Req() req, @Res() res){
        contador++;
        const params = req.query;
        this.propiedadesPreguntas
            .push(new PreguntaFrecuente(params.pregunta,params.respuesta));

        /*htmlPregFre = htmlPregFre.replace("{{pregunta}}",params.pregunta);
        htmlPregFre = htmlPregFre.replace("{{respuesta}}",params.respuesta);*/
        htmlPregFre = htmlPregFre.concat('<h1> {{contador}}. {{pregunta}}</h1>');
        htmlPregFre = htmlPregFre.replace("{{pregunta}}",params.pregunta);
        htmlPregFre = htmlPregFre.replace("{{contador}}",contador);
        htmlPregFre = htmlPregFre.concat('<p> {{respuesta}} </p>');
        htmlPregFre = htmlPregFre.replace("{{respuesta}}",params.respuesta);

        return res.send(this.propiedadesPreguntas);
    }

    @Get('mostrar')
    mostrarPreguntas(@Res () res){
        return res.status(200).send(htmlPregFre);
    }
}
