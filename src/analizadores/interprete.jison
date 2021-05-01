
/* Ejemplo clase 7. */

/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno
//%option yyloc

num         [0-9]+
id          [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*
escapeChar  [\'\"\\ntr]
escape      \\{escaperChar}
aceptacion  [^\"\\]+
aceptacion2  [^\'\\]+
cadena      (\"({escape}|{aceptacion})*\")
caracter    (\'({escape}|{aceptacion2})*\')

%%

/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}

/* Simbolos del programa */
"++"                   { console.log("Reconocio : "+ yytext); return 'INCRE'}
"--"                   { console.log("Reconocio : "+ yytext); return 'DECRE'}
"("                    { console.log("Reconocio : "+ yytext); return 'PARA'}
")"                    { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                    { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                    { console.log("Reconocio : "+ yytext); return 'CORC'}
"{"                    { console.log("Reconocio : "+ yytext); return 'LLAVEA'}
"}"                    { console.log("Reconocio : "+ yytext); return 'LLAVEC'}
";"                    { console.log("Reconocio : "+ yytext); return 'PYC'}
","                    { console.log("Reconocio : "+ yytext); return 'COMA'}
"?"                    { console.log("Reconocio : "+ yytext); return 'INTERROGAC'}
":"                    { console.log("Reconocio : "+ yytext); return 'DOSPTN'}

/* Operadores Aritmeticos */
"+"                    { console.log("Reconocio : "+ yytext); return 'MAS'}
"-"                    { console.log("Reconocio : "+ yytext); return 'MENOS'}
"*"                    { console.log("Reconocio : "+ yytext); return 'MULTI'}
"/"                    { console.log("Reconocio : "+ yytext); return 'DIV'}
"^"                    { console.log("Reconocio : "+ yytext); return 'POTENCIA'}
"%"                    { console.log("Reconocio : "+ yytext); return 'MODULO'}

/* Operaciones Relacionales */
"<="                    { console.log("Reconocio : "+ yytext); return 'MENORIGUAL'}
">="                    { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
"<"                    { console.log("Reconocio : "+ yytext); return 'MENORQUE'}
">"                    { console.log("Reconocio : "+ yytext); return 'MAYORQUE'}
"=="                    { console.log("Reconocio : "+ yytext); return 'IGUALIGUAL'}
"!="                    { console.log("Reconocio : "+ yytext); return 'DIFERENTE'}
"="                    { console.log("Reconocio : "+ yytext); return 'IGUAL'}

/* Operaciones Logicas */
"||"                    { console.log("Reconocio : "+ yytext); return 'OR'}
"&&"                    { console.log("Reconocio : "+ yytext); return 'AND'}
"!"                    { console.log("Reconocio : "+ yytext); return 'NOT'}

/* Palabras reservadas */
"evaluar"               { console.log("Reconocio : "+ yytext); return 'EVALUAR'}
"true"               { console.log("Reconocio : "+ yytext); return 'TRUE'}
"false"               { console.log("Reconocio : "+ yytext); return 'FALSE'}
"int"               { console.log("Reconocio : "+ yytext); return 'INT'}
"double"               { console.log("Reconocio : "+ yytext); return 'DOUBLE'}
"string"               { console.log("Reconocio : "+ yytext); return 'STRING'}
"char"               { console.log("Reconocio : "+ yytext); return 'CHAR'}
"boolean"               { console.log("Reconocio : "+ yytext); return 'BOOLEAN'}
"print"               { console.log("Reconocio : "+ yytext); return 'PRINT'}
"if"               { console.log("Reconocio : "+ yytext); return 'IF'}
"else"               { console.log("Reconocio : "+ yytext); return 'ELSE'}
"while"               { console.log("Reconocio : "+ yytext); return 'WHILE'}
"void"               { console.log("Reconocio : "+ yytext); return 'VOID'}
"exec"               { console.log("Reconocio : "+ yytext); return 'EXEC'}
"break"               { console.log("Reconocio : "+ yytext); return 'BREAK'}
"continue"               { console.log("Reconocio : "+ yytext); return 'CONTINUE'}
"return"               { console.log("Reconocio : "+ yytext); return 'RETURN'}
"tolower"               { console.log("Reconocio : "+ yytext); return 'TOLOWER'}
"toupper"               { console.log("Reconocio : "+ yytext); return 'TOUPPER'}
"truncate"               { console.log("Reconocio : "+ yytext); return 'TRUNCATE'}
"round"               { console.log("Reconocio : "+ yytext); return 'ROUND'}
"new"               { console.log("Reconocio : "+ yytext); return 'NEW'}
"typeof"               { console.log("Reconocio : "+ yytext); return 'TYPEOF'}
"tostring"               { console.log("Reconocio : "+ yytext); return 'TOSTRING'}
"for"               { console.log("Reconocio : "+ yytext); return 'FOR'}

/* SIMBOLOS ER */
[0-9]+("."[0-9]+)?\b  { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
{num}                    { console.log("Reconocio : "+ yytext); return 'ENTERO'}
{id}                    { console.log("Reconocio : "+ yytext); return 'ID'}
{cadena}                    { console.log("Reconocio: "+ yytext); return 'CADENA'}
{caracter}                    { console.log("Reconocio: "+ yytext); return 'CHAR'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { console.log("Error con: " + yytext)
                        new errores.default("Error lexico",`El caracter ${yytext} no pertence al lenguaje`,yylineno+1,yylloc.last_column+1)
                        }

/lex

/* Area de imports */
%{
    const evaluar = require('../clases/evaluar');
    const aritmetica = require('../clases/expresiones/operaciones/aritmetica');
    const relacional = require('../clases/expresiones/operaciones/relacional');
    const logica = require('../clases/expresiones/operaciones/logica');
    const primitivo = require('../clases/expresiones/primitivo')
    
    const ast = require('../clases/ast/ast');
    const declaracion = require('../clases/instrucciones/declaracion');
    const asignacion = require('../clases/instrucciones/asignacion');
    const simbolos = require('../clases/tablaSimbolos/simbolos');
    const tipo = require('../clases/tablaSimbolos/Tipo');

    const identificador = require('../clases/expresiones/identificador')
    const ternario = require('../clases/expresiones/ternario')
    const print = require('../clases/instrucciones/print')
    const if_ = require('../clases/instrucciones/sentenciasControl/if_')
    const while_ = require('../clases/instrucciones/sentenciasCiclica/while_')

    const funcion = require('../clases/instrucciones/funcion')
    const llamada = require('../clases/instrucciones/llamada')
    const exec = require('../clases/instrucciones/exec')

    const break_ = require('../clases/instrucciones/sentenciasTransferencia/break_')
    const errores = require('../clases/ast/errores')

    const return_ = require('../clases/instrucciones/sentenciasTransferencia/return_')
    const continue_ = require('../clases/instrucciones/sentenciasTransferencia/continue_')

    const toLowerUpper = require('../clases/expresiones/toLowerUpper')
    const truncate_ = require('../clases/expresiones/truncate_')
    const round_ = require('../clases/expresiones/round_')
    const tostring_ = require('../clases/expresiones/tostring_')
    const typeof_ = require('../clases/expresiones/typeof_')
    const for_ = require('../clases/instrucciones/sentenciasCiclica/for_')
    const casteo = require('../clases/expresiones/casteo')
    const vector_ = require('../clases/expresiones/vector_')
%}

/* Precedencia de operadores */

%right 'INTERROGAC'
//%left 'PARC'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'MENORIGUAL' 'MAYORIGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%left 'POTENCIA'
%right 'UNARIO'
%left 'MODULO'

%start inicio

%% /* Gramatica */


inicio
    : instrucciones EOF { console.log($1); $$ = new ast.default($1);  return $$; }
    ;

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   { $$= new Array(); $$.push($1); }
            ;

instruccion : declaracion       { $$ = $1; }
            | asignacion        { $$ = $1; }
            | print             { $$ = $1; }
            | sent_if           { $$ = $1; }
            | sent_while        { $$ = $1; }
            | sent_for          { $$ = $1; }
            | funciones         { $$ = $1; }
            | llamada PYC       { $$ = $1; }
            | EXEC llamada PYC       { $$ = new exec.default($2,@1.first_line,@1.last_column) }
            | ID INCRE PYC      { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'+',new primitivo.default(1,@1.first_line,@1.last_column),@1.first_line,@1.last_column,false),@1.first_line,@1.first_column); }
            | ID DECRE PYC      { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'-',new primitivo.default(1,@1.first_line,@1.last_column),@1.first_line,@1.last_column,false),@1.first_line,@1.first_column); }
            | BREAK PYC         { $$ = new break_.default(); }
            | CONTINUE PYC      { $$ = new continue_.default() }
            | RETURN PYC        { $$ = new return_.default(null) }
            | RETURN e PYC      { $$ = new return_.default($2) }
            | error             { console.log("Error con: " + yytext)
                                new errores.default("Error sintactico",`${yytext} genera conflicto`,this._$.first_line,this._$.first_column)
                                }
            ;

sent_if : IF PARA e PARC LLAVEA instrucciones LLAVEC        { $$ = new if_.default($3,$6,[],@1.first_line,@1.last_column) }
        | IF PARA e PARC LLAVEA instrucciones LLAVEC ELSE LLAVEA instrucciones LLAVEC  { $$ = new if_.default($3,$6,$10,@1.first_line,@1.last_column) }
        | IF PARA e PARC LLAVEA instrucciones LLAVEC ELSE sent_if       { $$ = new if_.default($3,$6,[$9],@1.first_line,@1.last_column) }
        ;

sent_while : WHILE PARA e PARC LLAVEA instrucciones LLAVEC      { $$ = new while_.default($3,$6,@1.first_line,@1.last_column) }
            ;

sent_for : FOR PARA asignacion e PYC actualizacion PARC LLAVEA instrucciones LLAVEC
            //constructor(asig_dec, condicion, lista_instrucciones, linea, columna)
            { $$ = new for_.default($3,$4,$6,$9,@1.first_line,@1.last_column) }
        ;

actualizacion : ID INCRE      { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'+',new primitivo.default(1,@1.first_line,@1.last_column),@1.first_line,@1.last_column,false),@1.first_line,@1.first_column); }
            | ID DECRE        { $$ = new asignacion.default($1,new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'-',new primitivo.default(1,@1.first_line,@1.last_column),@1.first_line,@1.last_column,false),@1.first_line,@1.first_column); }
            | ID IGUAL e     { $$ = new asignacion.default($1,$3,@1.first_line,@1.first_column); }
            ;

print : PRINT PARA e PARC PYC       { $$ = new print.default($3,@1.first_line,@1.last_column) }
            ;

funciones : VOID ID PARA PARC LLAVEA instrucciones LLAVEC                       { $$ = new funcion.default(3,new tipo.default('VOID'),$2,[],true,$6,@1.first_line,@1.last_column); }
            | VOID ID PARA lista_parametros PARC LLAVEA instrucciones LLAVEC    { $$ = new funcion.default(3,new tipo.default('VOID'),$2,$4,true,$7,@1.first_line,@1.last_column); }
            | tipo ID PARA PARC LLAVEA instrucciones LLAVEC                       { $$ = new funcion.default(3,$1,$2,[],false,$6,@1.first_line,@1.last_column); }
            | tipo ID PARA lista_parametros PARC LLAVEA instrucciones LLAVEC    { $$ = new funcion.default(2,$1,$2,$4,false,$7,@1.first_line,@1.last_column); }
            ;

lista_parametros : lista_parametros COMA tipo ID        { $$ = $1; $$.push(new simbolos.default(6,$3,$4,new identificador.default($4,@4.first_line,@4.last_column),@4.first_line,@4.last_column)) }
            | tipo ID                                   { $$ = new Array(); $$.push(new simbolos.default(6,$1,$2,new identificador.default($2,@2.first_line,@2.last_column),@2.first_line,@2.last_column)); }
                ;

llamada : ID PARA PARC      { $$ = new llamada.default($1,[],@1.first_line,@1.last_column); }
        | ID PARA lista_exp PARC        { $$ = new llamada.default($1,$3,@1.first_line,@1.last_column); }
        ;

lista_exp : lista_exp COMA e        { $$ = $1; $$.push($3); }
            | e     { $$ = new Array(); $$.push($1); }
            ;

declaracion : tipo lista_simbolos PYC       {$$ = new declaracion.default($1,$2,@1.first_line,@1.first_column); }
            //1     2   3     4   5   6     7   8   9  10   11
            | tipo CORA CORC ID IGUAL NEW tipo CORA e CORC PYC  { $$ = new declaracion.default($1,
            new Array(
                new simbolos.default(4,$7,$4,
                    //new primitivo.default(1,0,0)
                    new vector_.default($7,$9,[],@6.first_line,@6.last_column)
                )
            )
            ,@1.first_line,@1.last_column) }
            //DECLARACION constructor(tipo, lista_simbolos, linea, columna) {
            //SIMBOLOS constructor(simbolo: number, tipo: tipo, identificador: string, valor: any, linea: number, columna: number,lista_param?, metodo?) {
            //VECTOR constructor(tipo,size, valor) {
            //int   [    ]    x    = {0,0};
            //1     2   3     4   5   6      7   8    9
            | tipo CORA CORC ID IGUAL e PYC                     { $$ = new declaracion.default($1,
            new Array(
                new simbolos.default(4,$1,$4,
                    //new primitivo.default(1,0,0)
                    new vector_.default($1,null,$6,@6.first_line,@6.last_column)
                )
            )
            ,@1.first_line,@1.last_column) }
            ;

asignacion : ID IGUAL e PYC     { $$ = new asignacion.default($1,$3,@1.first_line,@1.first_column); }
            ;

tipo : INT      { $$ = new tipo.default('ENTERO'); }
    | DOUBLE    { $$ = new tipo.default('DOUBLE'); }
    | STRING    { $$ = new tipo.default('STRING'); }
    | CHAR      { $$ = new tipo.default('CHAR'); }
    | BOOLEAN   { $$ = new tipo.default('BOOLEAN'); }
    ;

lista_simbolos : lista_simbolos COMA ID                 { $$ = $1; $$.push(new simbolos.default(1,null,$3,null)); }
                | lista_simbolos COMA ID IGUAL e        { $$ = $1; $$.push(new simbolos.default(1,null,$3,$5)); }
                | ID                { $$ = new Array(); $$.push(new simbolos.default(1,null,$1,null)); }
                | ID IGUAL e        { $$ = new Array(); $$.push(new simbolos.default(1,null,$1,$3)); }
                ;

vector : ID IGUAL NEW tipo CORA e CORC    { $$ = new Array(); $$.push(
                                            new simbolos.default(4,$4,$1,new vector_.default($4,$6,[]))
                                        ) }
        | ID IGUAL e                    { $$ = new Array(); $$.push(
                                            new simbolos.default(4,null,$1,new vector_.default(null,0,$3))
                                        ) }
        ;*/

e : e MAS e                     { $$ = new aritmetica.default($1,'+', $3, @1.first_line, @1.last_column,false); }
    | e MENOS e                 { $$ = new aritmetica.default($1,'-', $3, @1.first_line, @1.last_column,false); }
    | e MULTI e                 { $$ = new aritmetica.default($1,'*', $3, @1.first_line, @1.last_column,false); }
    | e DIV e                   { $$ = new aritmetica.default($1,'/', $3, @1.first_line, @1.last_column,false); }
    | e POTENCIA e              { $$ = new aritmetica.default($1,'^', $3, @1.first_line, @1.last_column,false); }
    | e MODULO e                { $$ = new aritmetica.default($1,'%', $3, @1.first_line, @1.last_column,false); }
    | e OR e                    { $$ = new logica.default($1,'||', $3, @1.first_line, @1.last_column,false); }
    | e AND e                   { $$ = new logica.default($1,'&&', $3, @1.first_line, @1.last_column,false); }
    | NOT e                     { $$ = new logica.default($2,'!', $2, @2.first_line, @2.last_column,false); }
    | e MENORQUE e              { $$ = new relacional.default($1,'<', $3, @1.first_line, @1.last_column,false); }
    | e MAYORQUE e              { $$ = new relacional.default($1,'>', $3, @1.first_line, @1.last_column,false); }
    | e MENORIGUAL e            { $$ = new relacional.default($1,'<=', $3, @1.first_line, @1.last_column,false); }
    | e MAYORIGUAL e            { $$ = new relacional.default($1,'>=', $3, @1.first_line, @1.last_column,false); }
    | e IGUALIGUAL e            { $$ = new relacional.default($1,'==', $3, @1.first_line, @1.last_column,false); }
    | e DIFERENTE e             { $$ = new relacional.default($1,'!=', $3, @1.first_line, @1.last_column,false); }
    | MENOS e %prec UNARIO      { $$ = new aritmetica.default($2,'UNARIO', $2, @2.first_line, @2.last_column,false); }
    | DECIMAL                   { $$ = new primitivo.default(Number(yytext), @1.first_line, $1.last_column); }
    | ENTERO                    { $$ = new primitivo.default(Number(yytext), @1.first_line, $1.last_column); }
    | CADENA                    { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, @1.first_line, $1.last_column); }
    | CHAR                      { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, @1.first_line, $1.last_column); }
    | TRUE                      { $$ = new primitivo.default(true, @1.first_line, $1.last_column); }
    | FALSE                     { $$ = new primitivo.default(false, @1.first_line, $1.last_column); }
    | ID                        { $$ = new identificador.default($1,@1.first_line,@1.last_column) }
    | e INTERROGAC e DOSPTN e   { $$ = new ternario.default($1,$3,$5,@1.first_line,@1.last_column) }
    | ID INCRE                  { $$ = new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'+',new primitivo.default(1,@1.first_line,@1.last_column),@1.first_line,@1.last_column,false) }
    | ID DECRE                  { $$ = new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'-',new primitivo.default(1,@1.first_line,@1.last_column),@1.first_line,@1.last_column,false) }
    | llamada                   { $$ = $1 }
    | TOLOWER PARA e PARC       { $$ = new toLowerUpper.default($3,@1.first_line,@1.last_column,true) }
    | TOUPPER PARA e PARC       { $$ = new toLowerUpper.default($3,@1.first_line,@1.last_column,false) }
    | TRUNCATE PARA e PARC      { $$ = new truncate_.default($3,@1.first_line,@1.last_column) }
    | ROUND PARA e PARC         { $$ = new round_.default($3,@1.first_line,@1.last_column) }
    | PARA e PARC               { $$ = $2; }
    //| PARA tipo PARC e          { $$ = new casteo.default($2,$4,@1.first_line,@1.last_column) }
    | LLAVEA lista_exp LLAVEC   { $$ = $2 }
    | TYPEOF PARA e PARC        { $$ = new typeof_.default($3,@1.first_line,@1.last_column) }
    | TOSTRING PARA e PARC        { $$ = new tostring_.default($3,@1.first_line,@1.last_column) }
    ;

/*ee: e PARC               { $$ = $1; }
    | tipo PARC e          { $$ = new casteo.default($2,$4,@1.first_line,@1.last_column) }
    ;*/
/*
instruccion : EVALUAR CORA e CORC PYC { $$ = new evaluar.default($3); }
            ;
*/