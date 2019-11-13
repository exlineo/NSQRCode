export interface AppI {
    title:string;
    description:string;
    duration:number;
    root:string;
    manip?:ManipI;
    template?:TemplateI;
    atelier?:AtelierI;
}
export interface ManipI{
    title?:string;
    content:string;
    gameover:string;
}
export interface AtelierI{
    id:string;
    title:string;
    active?:boolean;
    duration?:number;
    background:string;
    instructions:string;
    manip?:ManipI;
    template?:TemplateI;
}
export interface DurationI{
    manip:string | number;
    quiz:string | number;
}
export interface SessionI{
    phase:string;
    duration:DurationI;
}
export interface TemplateI{
    logo:string;
    backgroundImage:string;
    pageBackground:string;
    pageText:string;
    headerBackground:string;
    headerText:string;
}
/**
 * Classe pour une instanciation d'un atelier nu
 */
export class AtelierC implements AtelierI{
    id:"";
    title:"-";
    active:true;
    duration:180;
    background:"";
    instructions:"";
}

export class DurationC implements DurationI{
    manip:600;
    quiz:600;
}