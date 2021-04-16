
/* Ejemplo clase 7. */

/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

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
.                     return 'ERROR'

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
%}

/* Precedencia de operadores */

%right 'INTERROGAC'
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
            ;

sent_if : IF PARA e PARC LLAVEA instrucciones LLAVEC        { $$ = new if_.default($3,$6,[],@1.first_line,@1.last_column) }
        | IF PARA e PARC LLAVEA instrucciones LLAVEC ELSE LLAVEA instrucciones LLAVEC  { $$ = new if_.default($3,$6,$10,@1.first_line,@1.last_column) }
        | IF PARA e PARC LLAVEA instrucciones LLAVEC ELSE sent_if       { $$ = new if_.default($3,$6,[$9],@1.first_line,@1.last_column) }
        ;

sent_while : WHILE PARA e PARC LLAVEA instrucciones LLAVEC      { $$ = new while_.default($3,$6,@1.first_line,@1.last_column) }
            ;

print : PRINT PARA e PARC PYC       { $$ = new print.default($3,@1.first_line,@1.last_column) }
            ;

declaracion : tipo lista_simbolos PYC       {$$ = new declaracion.default($1,$2,@1.first_line,@1.first_column); }
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

e : e MAS e { $$ = new aritmetica.default($1,'+', $3, $1.first_line, $1.last_column,false); }
    | e MENOS e { $$ = new aritmetica.default($1,'-', $3, $1.first_line, $1.last_column,false); }
    | e MULTI e { $$ = new aritmetica.default($1,'*', $3, $1.first_line, $1.last_column,false); }
    | e DIV e { $$ = new aritmetica.default($1,'/', $3, $1.first_line, $1.last_column,false); }
    | e POTENCIA e { $$ = new aritmetica.default($1,'^', $3, $1.first_line, $1.last_column,false); }
    | e MODULO e { $$ = new aritmetica.default($1,'%', $3, $1.first_line, $1.last_column,false); }
    | e OR e { $$ = new logica.default($1,'||', $3, $1.first_line, $1.last_column,false); }
    | e AND e { $$ = new logica.default($1,'&&', $3, $1.first_line, $1.last_column,false); }
    | NOT e { $$ = new logica.default($2,'!', $2, $2.first_line, $2.last_column,false); }
    | e MENORQUE e { $$ = new relacional.default($1,'<', $3, $1.first_line, $1.last_column,false); }
    | e MAYORQUE e { $$ = new relacional.default($1,'>', $3, $1.first_line, $1.last_column,false); }
    | e MENORIGUAL e { $$ = new relacional.default($1,'<=', $3, $1.first_line, $1.last_column,false); }
    | e MAYORIGUAL e { $$ = new relacional.default($1,'>=', $3, $1.first_line, $1.last_column,false); }
    | e IGUALIGUAL e { $$ = new relacional.default($1,'==', $3, $1.first_line, $1.last_column,false); }
    | e DIFERENTE e { $$ = new relacional.default($1,'!=', $3, $1.first_line, $1.last_column,false); }
    | MENOS e %prec UNARIO { $$ = new aritmetica.default($2,'UNARIO', $2, $2.first_line, $2.last_column,false); }
    | PARA e PARC { $$ = $2; }
    | DECIMAL { $$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column); }
    | ENTERO { $$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column); }
    | CADENA { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column); }
    | CHAR { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column); }
    | TRUE { $$ = new primitivo.default(true, $1.first_line, $1.last_column); }
    | FALSE { $$ = new primitivo.default(false, $1.first_line, $1.last_column); }
    | ID { $$ = new identificador.default($1,@1.first_line,@1.last_column) }
    | e INTERROGAC e DOSPTN e { $$ = new ternario.default($1,$3,$5,@1.first_line,@1.last_column) }
    ;

/*
instruccion : EVALUAR CORA e CORC PYC { $$ = new evaluar.default($3); }
            ;
*/