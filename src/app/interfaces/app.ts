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
    title:string;
    content:string;
    gameover:string;
}
export interface AtelierI{
    id:string;
    title:string;
    active:boolean;
    team:string | number;
    background:string;
    instructions:string;
}
export interface TemplateI{
    logo:string;
    backgroundImage:string;
    pageBackground:string;
    pageText:string;
    headerBackground:string;
    headerText:string;
}
export class App implements AppI{
    title = 'Coucou';
    description = "Description de l'expo";
    root = 'http://localhost';
    duration = 180;
    manip = {
        title:"Construire",
        content:"Contenu de l'atelier",
        gameover:"C'est la fin de la partie"
    };
    template = {
        logo:"/uploads/f5b7dd98b67b44428f57179aa304050f.png",
        backgroundImage:"/uploads/1d8eaacad8b74eb5bdfddf3f049987e5.jpg",
        pageBackground:"#E6E4DF",
        pageText:"#000000",
        headerBackground:"#495A8E",
        headerText:"#FFFFFF"
    };
    atelier = {
        id:"5db5f89df6c9ec000c51ab39",
        title:"Construire",
        active:true,
        team:"0",
        background:"",
        instructions:"instructions pour l'animateur"
    }
}