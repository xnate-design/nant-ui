import {
  Annotation,
  CharCategory,
  ContextTracker,
  Decoration,
  Direction,
  EditorSelection,
  EditorView,
  ExternalTokenizer,
  Facet,
  IterMode,
  LRLanguage,
  LRParser,
  LanguageSupport,
  LocalTokenGroup,
  MapMode,
  NodeWeakMap,
  Prec,
  RangeSet,
  RangeValue,
  StateEffect,
  StateField,
  Text,
  ViewPlugin,
  WidgetType,
  codePointAt,
  codePointSize,
  combineConfig,
  continuedIndent,
  defineLanguageFacet,
  delimitedIndent,
  flatIndent,
  foldInside,
  foldNodeProp,
  fromCodePoint,
  getTooltip,
  indentNodeProp,
  indentUnit,
  keymap,
  logException,
  showTooltip,
  styleTags,
  sublanguageProp,
  syntaxTree,
  tags,
} from './chunk-FPRXOFG6.js';

// ../../node_modules/.pnpm/@lezer+javascript@1.4.5/node_modules/@lezer/javascript/dist/index.js
var noSemi = 303;
var incdec = 1;
var incdecPrefix = 2;
var insertSemi = 304;
var spaces = 306;
var newline = 307;
var LineComment = 3;
var BlockComment = 4;
var space = [
  9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233,
  8239, 8287, 12288,
];
var braceR = 125;
var semicolon = 59;
var slash = 47;
var star = 42;
var plus = 43;
var minus = 45;
var trackNewline = new ContextTracker({
  start: false,
  shift(context, term) {
    return term == LineComment || term == BlockComment || term == spaces ? context : term == newline;
  },
  strict: false,
});
var insertSemicolon = new ExternalTokenizer(
  (input, stack) => {
    let { next } = input;
    if (next == braceR || next == -1 || stack.context) input.acceptToken(insertSemi);
  },
  { contextual: true, fallback: true },
);
var noSemicolon = new ExternalTokenizer(
  (input, stack) => {
    let { next } = input,
      after;
    if (space.indexOf(next) > -1) return;
    if (next == slash && ((after = input.peek(1)) == slash || after == star)) return;
    if (next != braceR && next != semicolon && next != -1 && !stack.context) input.acceptToken(noSemi);
  },
  { contextual: true },
);
var incdecToken = new ExternalTokenizer(
  (input, stack) => {
    let { next } = input;
    if (next == plus || next == minus) {
      input.advance();
      if (next == input.next) {
        input.advance();
        let mayPostfix = !stack.context && stack.canShift(incdec);
        input.acceptToken(mayPostfix ? incdec : incdecPrefix);
      }
    }
  },
  { contextual: true },
);
var jsHighlight = styleTags({
  'get set async static': tags.modifier,
  'for while do if else switch try catch finally return throw break continue default case': tags.controlKeyword,
  'in of await yield void typeof delete instanceof': tags.operatorKeyword,
  'let var const function class extends': tags.definitionKeyword,
  'import export from': tags.moduleKeyword,
  'with debugger as new': tags.keyword,
  TemplateString: tags.special(tags.string),
  super: tags.atom,
  BooleanLiteral: tags.bool,
  this: tags.self,
  null: tags.null,
  Star: tags.modifier,
  VariableName: tags.variableName,
  'CallExpression/VariableName TaggedTemplateExpression/VariableName': tags.function(tags.variableName),
  VariableDefinition: tags.definition(tags.variableName),
  Label: tags.labelName,
  PropertyName: tags.propertyName,
  PrivatePropertyName: tags.special(tags.propertyName),
  'CallExpression/MemberExpression/PropertyName': tags.function(tags.propertyName),
  'FunctionDeclaration/VariableDefinition': tags.function(tags.definition(tags.variableName)),
  'ClassDeclaration/VariableDefinition': tags.definition(tags.className),
  PropertyDefinition: tags.definition(tags.propertyName),
  PrivatePropertyDefinition: tags.definition(tags.special(tags.propertyName)),
  UpdateOp: tags.updateOperator,
  LineComment: tags.lineComment,
  BlockComment: tags.blockComment,
  Number: tags.number,
  String: tags.string,
  Escape: tags.escape,
  ArithOp: tags.arithmeticOperator,
  LogicOp: tags.logicOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  RegExp: tags.regexp,
  Equals: tags.definitionOperator,
  Arrow: tags.function(tags.punctuation),
  ': Spread': tags.punctuation,
  '( )': tags.paren,
  '[ ]': tags.squareBracket,
  '{ }': tags.brace,
  'InterpolationStart InterpolationEnd': tags.special(tags.brace),
  '.': tags.derefOperator,
  ', ;': tags.separator,
  '@': tags.meta,
  TypeName: tags.typeName,
  TypeDefinition: tags.definition(tags.typeName),
  'type enum interface implements namespace module declare': tags.definitionKeyword,
  'abstract global Privacy readonly override': tags.modifier,
  'is keyof unique infer': tags.operatorKeyword,
  JSXAttributeValue: tags.attributeValue,
  JSXText: tags.content,
  'JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag': tags.angleBracket,
  'JSXIdentifier JSXNameSpacedName': tags.tagName,
  'JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName': tags.attributeName,
  'JSXBuiltin/JSXIdentifier': tags.standard(tags.tagName),
});
var spec_identifier = {
  __proto__: null,
  export: 14,
  as: 19,
  from: 27,
  default: 30,
  async: 35,
  function: 36,
  extends: 46,
  this: 50,
  true: 58,
  false: 58,
  null: 70,
  void: 74,
  typeof: 78,
  super: 96,
  new: 130,
  delete: 146,
  yield: 155,
  await: 159,
  class: 164,
  public: 221,
  private: 221,
  protected: 221,
  readonly: 223,
  instanceof: 242,
  satisfies: 245,
  in: 246,
  const: 248,
  import: 280,
  keyof: 335,
  unique: 339,
  infer: 345,
  is: 381,
  abstract: 401,
  implements: 403,
  type: 405,
  let: 408,
  var: 410,
  using: 413,
  interface: 419,
  enum: 423,
  namespace: 429,
  module: 431,
  declare: 435,
  global: 439,
  for: 458,
  of: 467,
  while: 470,
  with: 474,
  do: 478,
  if: 482,
  else: 484,
  switch: 488,
  case: 494,
  try: 500,
  catch: 504,
  finally: 508,
  return: 512,
  throw: 516,
  break: 520,
  continue: 524,
  debugger: 528,
};
var spec_word = {
  __proto__: null,
  async: 117,
  get: 119,
  set: 121,
  declare: 181,
  public: 183,
  private: 183,
  protected: 183,
  static: 185,
  abstract: 187,
  override: 189,
  readonly: 195,
  accessor: 197,
  new: 385,
};
var spec_LessThan = { __proto__: null, '<': 137 };
var parser = LRParser.deserialize({
  version: 14,
  states:
    "$6tO`QUOOO%TQUOOO'WQWOOP(eOSOOO*sQ(CjO'#CfO*zOpO'#CgO+YO!bO'#CgO+hO07`O'#DZO-yQUO'#DaO.ZQUO'#DlO%TQUO'#DvO0_QUO'#EOOOQ(CY'#EW'#EWO0xQSO'#ETOOQO'#Ei'#EiOOQO'#Ic'#IcO1QQSO'#GkO1]QSO'#EhO1bQSO'#EhO3dQ(CjO'#JdO6TQ(CjO'#JeO6qQSO'#FWO6vQ#tO'#FoOOQ(CY'#F`'#F`O7RO&jO'#F`O7aQ,UO'#FvO8wQSO'#FuOOQ(CY'#Je'#JeOOQ(CW'#Jd'#JdO8|QSO'#GoOOQQ'#KP'#KPO9XQSO'#IPO9^Q(C[O'#IQOOQQ'#JQ'#JQOOQQ'#IU'#IUQ`QUOOO%TQUO'#DnO9fQUO'#DzO9mQUO'#D|O9SQSO'#GkO9tQ,UO'#ClO:SQSO'#EgO:_QSO'#ErO:dQ,UO'#F_O;RQSO'#GkOOQO'#KQ'#KQO;WQSO'#KQO;fQSO'#GsO;fQSO'#GtO;fQSO'#GvO9SQSO'#GyO<]QSO'#G|O=tQSO'#CbO>UQSO'#HYO>^QSO'#H`O>^QSO'#HbO`QUO'#HdO>^QSO'#HfO>^QSO'#HiO>cQSO'#HoO>hQ(C]O'#HuO%TQUO'#HwO>sQ(C]O'#HyO?OQ(C]O'#H{O9^Q(C[O'#H}O?ZQ(CjO'#CfO@]QWO'#DfQOQSOOO%TQUO'#D|O@sQSO'#EPO9tQ,UO'#EgOAOQSO'#EgOAZQ`O'#F_OOQQ'#Cd'#CdOOQ(CW'#Dk'#DkOOQ(CW'#Jh'#JhO%TQUO'#JhOOQO'#Jl'#JlOOQO'#I`'#I`OBZQWO'#E`OOQ(CW'#E_'#E_OCVQ(C`O'#E`OCaQWO'#ESOOQO'#Jk'#JkOCuQWO'#JlOESQWO'#ESOCaQWO'#E`PEaO?MpO'#C`POOO)CDo)CDoOOOO'#IV'#IVOElOpO,59ROOQ(CY,59R,59ROOOO'#IW'#IWOEzO!bO,59RO%TQUO'#D]OOOO'#IY'#IYOFYO07`O,59uOOQ(CY,59u,59uOFhQUO'#IZOF{QSO'#JfOH}QbO'#JfO+vQUO'#JfOIUQSO,59{OIlQSO'#EiOIyQSO'#JtOJUQSO'#JsOJUQSO'#JsOJ^QSO,5;VOJcQSO'#JrOOQ(CY,5:W,5:WOJjQUO,5:WOLkQ(CjO,5:bOM[QSO,5:jOMuQ(C[O'#JqOM|QSO'#JpO8|QSO'#JpONbQSO'#JpONjQSO,5;UONoQSO'#JpO!!wQbO'#JeOOQ(CY'#Cf'#CfO%TQUO'#EOO!#gQ`O,5:oOOQO'#Jm'#JmOOQO-E<a-E<aO9SQSO,5=VO!#}QSO,5=VO!$SQUO,5;SO!&VQ,UO'#EdO!'jQSO,5;SO!)SQ,UO'#DpO!)ZQUO'#DuO!)eQWO,5;]O!)mQWO,5;]O%TQUO,5;]OOQQ'#FO'#FOOOQQ'#FQ'#FQO%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^OOQQ'#FU'#FUO!){QUO,5;oOOQ(CY,5;t,5;tOOQ(CY,5;u,5;uO!,OQSO,5;uOOQ(CY,5;v,5;vO%TQUO'#IgO!,WQ(C[O,5<cO!&VQ,UO,5;^O!,uQ,UO,5;^O%TQUO,5;rO!,|Q#tO'#FeO!-yQ#tO'#JxO!-eQ#tO'#JxO!.QQ#tO'#JxOOQO'#Jx'#JxO!.fQ#tO,5;}OOOO,5<Z,5<ZO!.wQUO'#FqOOOO'#If'#IfO7RO&jO,5;zO!/OQ#tO'#FsOOQ(CY,5;z,5;zO!/oQ7[O'#CrOOQ(CY'#Cv'#CvO!0SQSO'#CvO!0XO07`O'#CzO!0uQ,UO,5<`O!0|QSO,5<bO!2cQMhO'#GQO!2pQSO'#GRO!2uQSO'#GRO!2zQMhO'#GVO!3yQWO'#GZO!4lQ7[O'#J_OOQ(CY'#J_'#J_O!4vQSO'#J^O!5UQSO'#J]O!5^QSO'#CqOOQ(CY'#Ct'#CtOOQ(CY'#DO'#DOOOQ(CY'#DQ'#DQO0{QSO'#DSO!'oQ,UO'#FxO!'oQ,UO'#FzO!5fQSO'#F|O!5kQSO'#F}O!2uQSO'#GTO!'oQ,UO'#GYO!5pQSO'#EjO!6_QSO,5<aOOQ(CW'#Co'#CoO!6gQSO'#EkO!7aQWO'#ElOOQ(CW'#Jr'#JrO!7hQ(C[O'#KRO9^Q(C[O,5=ZO`QUO,5>kOOQQ'#JY'#JYOOQQ,5>l,5>lOOQQ-E<S-E<SO!9jQ(CjO,5:YO!<WQ(CjO,5:fO%TQUO,5:fO!>qQ(CjO,5:hOOQO,5@l,5@lO!?bQ,UO,5=VO!?pQ(C[O'#JZO8wQSO'#JZO!@RQ(C[O,59WO!@^QWO,59WO!@fQ,UO,59WO9tQ,UO,59WO!@qQSO,5;SO!@yQSO'#HXO!A[QSO'#KUO%TQUO,5;wO!7[QWO,5;yO!AdQSO,5=rO!AiQSO,5=rO!AnQSO,5=rO9^Q(C[O,5=rO;fQSO,5=bOOQO'#Cr'#CrO!A|QWO,5=_O!BUQ,UO,5=`O!BaQSO,5=bO!BfQ`O,5=eO!BnQSO'#KQO>cQSO'#HOO9SQSO'#HQO!BsQSO'#HQO9tQ,UO'#HSO!BxQSO'#HSOOQQ,5=h,5=hO!B}QSO'#HTO!CVQSO'#ClO!C[QSO,58|O!CfQSO,58|O!EkQUO,58|OOQQ,58|,58|O!E{Q(C[O,58|O%TQUO,58|O!HWQUO'#H[OOQQ'#H]'#H]OOQQ'#H^'#H^O`QUO,5=tO!HnQSO,5=tO`QUO,5=zO`QUO,5=|O!HsQSO,5>OO`QUO,5>QO!HxQSO,5>TO!H}QUO,5>ZOOQQ,5>a,5>aO%TQUO,5>aO9^Q(C[O,5>cOOQQ,5>e,5>eO!MXQSO,5>eOOQQ,5>g,5>gO!MXQSO,5>gOOQQ,5>i,5>iO!M^QWO'#DXO%TQUO'#JhO!M{QWO'#JhO!NjQWO'#DgO!N{QWO'#DgO##^QUO'#DgO##eQSO'#JgO##mQSO,5:QO##rQSO'#EmO#$QQSO'#JuO#$YQSO,5;WO#$_QWO'#DgO#$lQWO'#EROOQ(CY,5:k,5:kO%TQUO,5:kO#$sQSO,5:kO>cQSO,5;RO!@^QWO,5;RO!@fQ,UO,5;RO9tQ,UO,5;RO#${QSO,5@SO#%QQ!LQO,5:oOOQO-E<^-E<^O#&WQ(C`O,5:zOCaQWO,5:nO#&bQWO,5:nOCaQWO,5:zO!@RQ(C[O,5:nOOQ(CW'#Ec'#EcOOQO,5:z,5:zO%TQUO,5:zO#&oQ(C[O,5:zO#&zQ(C[O,5:zO!@^QWO,5:nOOQO,5;Q,5;QO#'YQ(C[O,5:zPOOO'#IT'#ITP#'nO?MpO,58zPOOO,58z,58zOOOO-E<T-E<TOOQ(CY1G.m1G.mOOOO-E<U-E<UO#'yQ`O,59wOOOO-E<W-E<WOOQ(CY1G/a1G/aO#(OQbO,5>uO+vQUO,5>uOOQO,5>{,5>{O#(YQUO'#IZOOQO-E<X-E<XO#(gQSO,5@QO#(oQbO,5@QO#(vQSO,5@_OOQ(CY1G/g1G/gO%TQUO,5@`O#)OQSO'#IaOOQO-E<_-E<_O#(vQSO,5@_OOQ(CW1G0q1G0qOOQ(CY1G/r1G/rOOQ(CY1G0U1G0UO%TQUO,5@]O#)dQ(C[O,5@]O#)uQ(C[O,5@]O#)|QSO,5@[O8|QSO,5@[O#*UQSO,5@[O#*dQSO'#IdO#)|QSO,5@[OOQ(CW1G0p1G0pO!)eQWO,5:qO!)pQWO,5:qOOQO,5:s,5:sO#+UQSO,5:sO#+^Q,UO1G2qO9SQSO1G2qOOQ(CY1G0n1G0nO#+lQ(CjO1G0nO#,qQ(ChO,5;OOOQ(CY'#GP'#GPO#-_Q(CjO'#J_O!$SQUO1G0nO#/gQ,UO'#JiO#/qQSO,5:[O#/vQbO'#JjO%TQUO'#JjO#0QQSO,5:aOOQ(CY'#DX'#DXOOQ(CY1G0w1G0wO%TQUO1G0wOOQ(CY1G1a1G1aO#0VQSO1G0wO#2nQ(CjO1G0xO#2uQ(CjO1G0xO#5`Q(CjO1G0xO#5gQ(CjO1G0xO#7qQ(CjO1G0xO#8XQ(CjO1G0xO#;RQ(CjO1G0xO#;YQ(CjO1G0xO#=sQ(CjO1G0xO#=zQ(CjO1G0xO#?rQ(CjO1G0xO#BrQ$IUO'#CfO#DpQ$IUO1G1ZO#DwQ$IUO'#JeO!,RQSO1G1aO#EXQ(CjO,5?ROOQ(CW-E<e-E<eO#E{Q(CjO1G0xOOQ(CY1G0x1G0xO#HWQ(CjO1G1^O#HzQ#tO,5<RO#ISQ#tO,5<SO#I[Q#tO'#FjO#IsQSO'#FiOOQO'#Jy'#JyOOQO'#Ie'#IeO#IxQ#tO1G1iOOQ(CY1G1i1G1iOOOO1G1t1G1tO#JZQ$IUO'#JdO#JeQSO,5<]O!){QUO,5<]OOOO-E<d-E<dOOQ(CY1G1f1G1fO#JjQWO'#JxOOQ(CY,5<_,5<_O#JrQWO,5<_OOQ(CY,59b,59bO!&VQ,UO'#C|OOOO'#IX'#IXO#JwO07`O,59fOOQ(CY,59f,59fO%TQUO1G1zO!5kQSO'#IiO#KSQ,UO,5<sOOQ(CY,5<p,5<pOOQO'#Gf'#GfO!'oQ,UO,5=POOQO'#Gh'#GhO!'oQ,UO,5=RO!&VQ,UO,5=TOOQO1G1|1G1|O#KZQ`O'#CoO#KnQ`O,5<lO#KuQSO'#J|O9SQSO'#J|O#LTQSO,5<nO!'oQ,UO,5<mO#LYQSO'#GSO#LeQSO,5<mO#LjQ`O'#GPO#LwQ`O'#J}O#MRQSO'#J}O!&VQ,UO'#J}O#MWQSO,5<qO#M]QWO'#G[O!3tQWO'#G[O#MnQSO'#G^O#MsQSO'#G`O!2uQSO'#GcO#MxQ(C[O'#IkO#NTQWO,5<uOOQ(CY,5<u,5<uO#N[QWO'#G[O#NjQWO'#G]O#NrQWO'#G]OOQ(CY,5=U,5=UO!'oQ,UO,5?xO!'oQ,UO,5?xO#NwQSO'#IlO$ SQSO,5?wO$ [QSO,59]O$ {Q,UO,59nOOQ(CY,59n,59nO$!nQ,UO,5<dO$#aQ,UO,5<fO@TQSO,5<hOOQ(CY,5<i,5<iO$#kQSO,5<oO$#pQ,UO,5<tO$$QQSO'#JpO!$SQUO1G1{O$$VQSO1G1{O8|QSO'#JsO8|QSO'#EmO%TQUO'#EmO8|QSO'#InO$$[Q(C[O,5@mOOQQ1G2u1G2uOOQQ1G4V1G4VOOQ(CY1G/t1G/tO!,OQSO1G/tO$&aQ(CjO1G0QOOQQ1G2q1G2qO!&VQ,UO1G2qO%TQUO1G2qO$'QQSO1G2qO$']Q,UO'#EdOOQ(CW,5?u,5?uO$'gQ(C[O,5?uOOQQ1G.r1G.rO!@RQ(C[O1G.rO!@^QWO1G.rO!@fQ,UO1G.rO$'xQSO1G0nO$'}QSO'#CfO$(YQSO'#KVO$(bQSO,5=sO$(gQSO'#KVO$(lQSO'#KVO$(wQSO'#ItO$)VQSO,5@pO$)_QbO1G1cOOQ(CY1G1e1G1eO9SQSO1G3^O@TQSO1G3^O$)fQSO1G3^O$)kQSO1G3^OOQQ1G3^1G3^O!BaQSO1G2|O!&VQ,UO1G2yO$)pQSO1G2yOOQQ1G2z1G2zO!&VQ,UO1G2zO$)uQSO1G2zO$)}QWO'#GxOOQQ1G2|1G2|O!3tQWO'#IpO!BfQ`O1G3POOQQ1G3P1G3POOQQ,5=j,5=jO$*VQ,UO,5=lO9SQSO,5=lO#MsQSO,5=nO8wQSO,5=nO!@^QWO,5=nO!@fQ,UO,5=nO9tQ,UO,5=nO$*eQSO'#KTO$*pQSO,5=oOOQQ1G.h1G.hO$*uQ(C[O1G.hO@TQSO1G.hO$+QQSO1G.hO9^Q(C[O1G.hO$-VQbO,5@rO$-gQSO,5@rO8|QSO,5@rO$-rQUO,5=vO$-yQSO,5=vOOQQ1G3`1G3`O`QUO1G3`OOQQ1G3f1G3fOOQQ1G3h1G3hO>^QSO1G3jO$.OQUO1G3lO$2SQUO'#HkOOQQ1G3o1G3oO$2aQSO'#HqO>cQSO'#HsOOQQ1G3u1G3uO$2iQUO1G3uO9^Q(C[O1G3{OOQQ1G3}1G3}OOQ(CW'#GW'#GWO9^Q(C[O1G4PO9^Q(C[O1G4RO$6pQSO,5@SO!){QUO,5;XO8|QSO,5;XO>cQSO,5:RO!){QUO,5:RO!@^QWO,5:RO$6uQ$IUO,5:ROOQO,5;X,5;XO$7PQWO'#I[O$7gQSO,5@ROOQ(CY1G/l1G/lO$7oQWO'#IbO$7yQSO,5@aOOQ(CW1G0r1G0rO!N{QWO,5:ROOQO'#I_'#I_O$8RQWO,5:mOOQ(CY,5:m,5:mO#$vQSO1G0VOOQ(CY1G0V1G0VO%TQUO1G0VOOQ(CY1G0m1G0mO>cQSO1G0mO!@^QWO1G0mO!@fQ,UO1G0mOOQ(CW1G5n1G5nO!@RQ(C[O1G0YOOQO1G0f1G0fO%TQUO1G0fO$8YQ(C[O1G0fO$8eQ(C[O1G0fO!@^QWO1G0YOCaQWO1G0YO$8sQ(C[O1G0fOOQO1G0Y1G0YO$9XQ(CjO1G0fPOOO-E<R-E<RPOOO1G.f1G.fOOOO1G/c1G/cO$9cQ`O,5<cO$9kQbO1G4aOOQO1G4g1G4gO%TQUO,5>uO$9uQSO1G5lO$9}QSO1G5yO$:VQbO1G5zO8|QSO,5>{O$:aQ(CjO1G5wO%TQUO1G5wO$:qQ(C[O1G5wO$;SQSO1G5vO$;SQSO1G5vO8|QSO1G5vO$;[QSO,5?OO8|QSO,5?OOOQO,5?O,5?OO$;pQSO,5?OO$$QQSO,5?OOOQO-E<b-E<bOOQO1G0]1G0]OOQO1G0_1G0_O!,RQSO1G0_OOQQ7+(]7+(]O!&VQ,UO7+(]O%TQUO7+(]O$<OQSO7+(]O$<ZQ,UO7+(]O$<iQ(CjO,59nO$>qQ(CjO,5<dO$@|Q(CjO,5<fO$CXQ(CjO,5<tOOQ(CY7+&Y7+&YO$EjQ(CjO7+&YO$F^Q,UO'#I]O$FhQSO,5@TOOQ(CY1G/v1G/vO$FpQUO'#I^O$F}QSO,5@UO$GVQbO,5@UOOQ(CY1G/{1G/{O$GaQSO7+&cOOQ(CY7+&c7+&cO$GfQ$IUO,5:bO%TQUO7+&uO$GpQ$IUO,5:YO$G}Q$IUO,5:fO$HXQ$IUO,5:hOOQ(CY7+&{7+&{OOQO1G1m1G1mOOQO1G1n1G1nO$HcQ#tO,5<UO!){QUO,5<TOOQO-E<c-E<cOOQ(CY7+'T7+'TOOOO7+'`7+'`OOOO1G1w1G1wO$HnQSO1G1wOOQ(CY1G1y1G1yO$HsQ`O,59hOOOO-E<V-E<VOOQ(CY1G/Q1G/QO$HzQ(CjO7+'fOOQ(CY,5?T,5?TO$InQ`O,5?TOOQ(CY1G2_1G2_P!&VQ,UO'#IiPOQ(CY-E<g-E<gO$J^Q,UO1G2kO$KPQ,UO1G2mO$KZQ`O1G2oOOQ(CY1G2W1G2WO$KbQSO'#IhO$KpQSO,5@hO$KpQSO,5@hO$KxQSO,5@hO$LTQSO,5@hOOQO1G2Y1G2YO$LcQ,UO1G2XO!'oQ,UO1G2XO$LsQMhO'#IjO$MTQSO,5@iO!&VQ,UO,5@iO$M]Q`O,5@iOOQ(CY1G2]1G2]OOQ(CW,5<v,5<vOOQ(CW,5<w,5<wO$$QQSO,5<wOCQQSO,5<wO!@^QWO,5<vOOQO'#G_'#G_O$MgQSO,5<xOOQ(CW,5<z,5<zO$$QQSO,5<}OOQO,5?V,5?VOOQO-E<i-E<iOOQ(CY1G2a1G2aO!3tQWO,5<vO$MoQSO,5<wO#MnQSO,5<xO!3tQWO,5<wO$MzQ,UO1G5dO$NUQ,UO1G5dOOQO,5?W,5?WOOQO-E<j-E<jOOQO1G.w1G.wO!7[QWO,59pO%TQUO,59pO$NcQSO1G2SO!'oQ,UO1G2ZO$NhQ(CjO7+'gOOQ(CY7+'g7+'gO!$SQUO7+'gO% [QSO,5;XOOQ(CW,5?Y,5?YOOQ(CW-E<l-E<lOOQ(CY7+%`7+%`O% aQ`O'#KOO#$vQSO7+(]O% kQbO7+(]O$<RQSO7+(]O% rQ(ChO'#CfO%!VQ(ChO,5<{O%!wQSO,5<{OOQ(CW1G5a1G5aOOQQ7+$^7+$^O!@RQ(C[O7+$^O!@^QWO7+$^O!$SQUO7+&YO%!|QSO'#IsO%#bQSO,5@qOOQO1G3_1G3_O9SQSO,5@qO%#bQSO,5@qO%#jQSO,5@qOOQO,5?`,5?`OOQO-E<r-E<rOOQ(CY7+&}7+&}O%#oQSO7+(xO9^Q(C[O7+(xO9SQSO7+(xO@TQSO7+(xOOQQ7+(h7+(hO%#tQ(ChO7+(eO!&VQ,UO7+(eO%$OQ`O7+(fOOQQ7+(f7+(fO!&VQ,UO7+(fO%$VQSO'#KSO%$bQSO,5=dOOQO,5?[,5?[OOQO-E<n-E<nOOQQ7+(k7+(kO%%qQWO'#HROOQQ1G3W1G3WO!&VQ,UO1G3WO%TQUO1G3WO%%xQSO1G3WO%&TQ,UO1G3WO9^Q(C[O1G3YO#MsQSO1G3YO8wQSO1G3YO!@^QWO1G3YO!@fQ,UO1G3YO%&cQSO'#IrO%&nQSO,5@oO%&vQWO,5@oOOQ(CW1G3Z1G3ZOOQQ7+$S7+$SO@TQSO7+$SO9^Q(C[O7+$SO%'RQSO7+$SO%TQUO1G6^O%TQUO1G6_O%'WQ(C[O1G6^O%'bQUO1G3bO%'iQSO1G3bO%'nQUO1G3bOOQQ7+(z7+(zO9^Q(C[O7+)UO`QUO7+)WOOQQ'#KY'#KYOOQQ'#Iu'#IuO%'uQUO,5>VOOQQ,5>V,5>VO%TQUO'#HlO%(SQSO'#HnOOQQ,5>],5>]O8|QSO,5>]OOQQ,5>_,5>_OOQQ7+)a7+)aOOQQ7+)g7+)gOOQQ7+)k7+)kOOQQ7+)m7+)mO%(XQWO1G5nO%(mQ$IUO1G0sO%(wQSO1G0sOOQO1G/m1G/mO%)SQ$IUO1G/mO>cQSO1G/mO!){QUO'#DgOOQO,5>v,5>vOOQO-E<Y-E<YOOQO,5>|,5>|OOQO-E<`-E<`O!@^QWO1G/mOOQO-E<]-E<]OOQ(CY1G0X1G0XOOQ(CY7+%q7+%qO#$vQSO7+%qOOQ(CY7+&X7+&XO>cQSO7+&XO!@^QWO7+&XOOQO7+%t7+%tO$9XQ(CjO7+&QOOQO7+&Q7+&QO%TQUO7+&QO%)^Q(C[O7+&QO!@RQ(C[O7+%tO!@^QWO7+%tO%)iQ(C[O7+&QO%)wQ(CjO7++cO%TQUO7++cO%*XQSO7++bO%*XQSO7++bOOQO1G4j1G4jO8|QSO1G4jO%*aQSO1G4jOOQO7+%y7+%yO#$vQSO<<KwO% kQbO<<KwO%*oQSO<<KwOOQQ<<Kw<<KwO!&VQ,UO<<KwO%TQUO<<KwO%*wQSO<<KwO%+SQ(CjO1G2kO%-_Q(CjO1G2mO%/jQ(CjO1G2XO%1{Q,UO,5>wOOQO-E<Z-E<ZO%2VQbO,5>xO%TQUO,5>xOOQO-E<[-E<[O%2aQSO1G5pOOQ(CY<<I}<<I}O%2iQ$IUO1G0nO%4sQ$IUO1G0xO%4zQ$IUO1G0xO%7OQ$IUO1G0xO%7VQ$IUO1G0xO%8zQ$IUO1G0xO%9bQ$IUO1G0xO%;uQ$IUO1G0xO%;|Q$IUO1G0xO%>QQ$IUO1G0xO%>XQ$IUO1G0xO%@PQ$IUO1G0xO%@dQ(CjO<<JaO%AiQ$IUO1G0xO%C_Q$IUO'#J_O%EbQ$IUO1G1^O%EoQ$IUO1G0QO!){QUO'#FlOOQO'#Jz'#JzOOQO1G1p1G1pO%EyQSO1G1oO%FOQ$IUO,5?ROOOO7+'c7+'cOOOO1G/S1G/SOOQ(CY1G4o1G4oO!'oQ,UO7+(ZO%FYQSO,5?SO9SQSO,5?SOOQO-E<f-E<fO%FhQSO1G6SO%FhQSO1G6SO%FpQSO1G6SO%F{Q,UO7+'sO%G]Q`O,5?UO%GgQSO,5?UO!&VQ,UO,5?UOOQO-E<h-E<hO%GlQ`O1G6TO%GvQSO1G6TOOQ(CW1G2c1G2cO$$QQSO1G2cOOQ(CW1G2b1G2bO%HOQSO1G2dO!&VQ,UO1G2dOOQ(CW1G2i1G2iO!@^QWO1G2bOCQQSO1G2cO%HTQSO1G2dO%H]QSO1G2cO!'oQ,UO7++OOOQ(CY1G/[1G/[O%HhQSO1G/[OOQ(CY7+'n7+'nO%HmQ,UO7+'uO%H}Q(CjO<<KROOQ(CY<<KR<<KRO%IqQSO1G0sO!&VQ,UO'#ImO%IvQSO,5@jO!&VQ,UO1G2gOOQQ<<Gx<<GxO!@RQ(C[O<<GxO%JOQ(CjO<<ItOOQ(CY<<It<<ItOOQO,5?_,5?_O%JrQSO,5?_O$(lQSO,5?_OOQO-E<q-E<qO%JwQSO1G6]O%JwQSO1G6]O9SQSO1G6]O@TQSO<<LdOOQQ<<Ld<<LdO%KPQSO<<LdO9^Q(C[O<<LdOOQQ<<LP<<LPO%#tQ(ChO<<LPOOQQ<<LQ<<LQO%$OQ`O<<LQO%KUQWO'#IoO%KaQSO,5@nO!){QUO,5@nOOQQ1G3O1G3OO%KiQUO'#JhOOQO'#Iq'#IqO9^Q(C[O'#IqO%KsQWO,5=mOOQQ,5=m,5=mO%KzQWO'#E`O%L`QSO7+(rO%LeQSO7+(rOOQQ7+(r7+(rO!&VQ,UO7+(rO%TQUO7+(rO%LmQSO7+(rOOQQ7+(t7+(tO9^Q(C[O7+(tO#MsQSO7+(tO8wQSO7+(tO!@^QWO7+(tO%LxQSO,5?^OOQO-E<p-E<pOOQO'#HU'#HUO%MTQSO1G6ZO9^Q(C[O<<GnOOQQ<<Gn<<GnO@TQSO<<GnO%M]QSO7++xO%MbQSO7++yO%TQUO7++xO%TQUO7++yOOQQ7+(|7+(|O%MgQSO7+(|O%MlQUO7+(|O%MsQSO7+(|OOQQ<<Lp<<LpOOQQ<<Lr<<LrOOQQ-E<s-E<sOOQQ1G3q1G3qO%MxQSO,5>WOOQQ,5>Y,5>YO%M}QSO1G3wO8|QSO7+&_O!){QUO7+&_OOQO7+%X7+%XO%NSQ$IUO1G5zO>cQSO7+%XOOQ(CY<<I]<<I]OOQ(CY<<Is<<IsO>cQSO<<IsOOQO<<Il<<IlO$9XQ(CjO<<IlO%TQUO<<IlOOQO<<I`<<I`O!@RQ(C[O<<I`O%N^Q(C[O<<IlO%NiQ(CjO<<N}O%NyQSO<<N|OOQO7+*U7+*UO8|QSO7+*UOOQQANAcANAcO& RQSOANAcO!&VQ,UOANAcO#$vQSOANAcO% kQbOANAcO%TQUOANAcO& ZQ(CjO7+'sO&#lQ(CjO7+'uO&%}QbO1G4dO&&XQ$IUO7+&YO&&fQ$IUO,59nO&(iQ$IUO,5<dO&*lQ$IUO,5<fO&,oQ$IUO,5<tO&.eQ$IUO7+'fO&.rQ$IUO7+'gO&/PQSO,5<WOOQO7+'Z7+'ZO&/UQ,UO<<KuOOQO1G4n1G4nO&/]QSO1G4nO&/hQSO1G4nO&/vQSO7++nO&/vQSO7++nO!&VQ,UO1G4pO&0OQ`O1G4pO&0YQSO7++oOOQ(CW7+'}7+'}O$$QQSO7+(OO&0bQ`O7+(OOOQ(CW7+'|7+'|O$$QQSO7+'}O&0iQSO7+(OO!&VQ,UO7+(OOCQQSO7+'}O&0nQ,UO<<NjOOQ(CY7+$v7+$vO&0xQ`O,5?XOOQO-E<k-E<kO&1SQ(ChO7+(ROOQQAN=dAN=dO9SQSO1G4yOOQO1G4y1G4yO&1dQSO1G4yO&1iQSO7++wO&1iQSO7++wO9^Q(C[OANBOO@TQSOANBOOOQQANBOANBOOOQQANAkANAkOOQQANAlANAlO&1qQSO,5?ZOOQO-E<m-E<mO&1|Q$IUO1G6YO&4^QbO'#CfOOQO,5?],5?]OOQO-E<o-E<oOOQQ1G3X1G3XO%KiQUO,5<xOOQQ<<L^<<L^O!&VQ,UO<<L^O%L`QSO<<L^O&4hQSO<<L^O%TQUO<<L^OOQQ<<L`<<L`O9^Q(C[O<<L`O#MsQSO<<L`O8wQSO<<L`O&4pQWO1G4xO&4{QSO7++uOOQQAN=YAN=YO9^Q(C[OAN=YOOQQ<= d<= dOOQQ<= e<= eO&5TQSO<= dO&5YQSO<= eOOQQ<<Lh<<LhO&5_QSO<<LhO&5dQUO<<LhOOQQ1G3r1G3rO>cQSO7+)cO&5kQSO<<IyO&5vQ$IUO<<IyOOQO<<Hs<<HsOOQ(CYAN?_AN?_OOQOAN?WAN?WO$9XQ(CjOAN?WOOQOAN>zAN>zO%TQUOAN?WOOQO<<Mp<<MpOOQQG26}G26}O!&VQ,UOG26}O#$vQSOG26}O&6QQSOG26}O% kQbOG26}O&6YQ$IUO<<JaO&6gQ$IUO1G2XO&8]Q$IUO1G2kO&:`Q$IUO1G2mO&<cQ$IUO<<KRO&<pQ$IUO<<ItOOQO1G1r1G1rO!'oQ,UOANAaOOQO7+*Y7+*YO&<}QSO7+*YO&=YQSO<= YO&=bQ`O7+*[OOQ(CW<<Kj<<KjO$$QQSO<<KjOOQ(CW<<Ki<<KiO&=lQ`O<<KjO$$QQSO<<KiOOQO7+*e7+*eO9SQSO7+*eO&=sQSO<= cOOQQG27jG27jO9^Q(C[OG27jO!){QUO1G4uO&={QSO7++tO%L`QSOANAxOOQQANAxANAxO!&VQ,UOANAxO&>TQSOANAxOOQQANAzANAzO9^Q(C[OANAzO#MsQSOANAzOOQO'#HV'#HVOOQO7+*d7+*dOOQQG22tG22tOOQQANEOANEOOOQQANEPANEPOOQQANBSANBSO&>]QSOANBSOOQQ<<L}<<L}O!){QUOAN?eOOQOG24rG24rO$9XQ(CjOG24rO#$vQSOLD,iOOQQLD,iLD,iO!&VQ,UOLD,iO&>bQSOLD,iO&>jQ$IUO7+'sO&@`Q$IUO7+'uO&BUQ,UOG26{OOQO<<Mt<<MtOOQ(CWANAUANAUO$$QQSOANAUOOQ(CWANATANATOOQO<<NP<<NPOOQQLD-ULD-UO&BfQ$IUO7+*aOOQQG27dG27dO%L`QSOG27dO!&VQ,UOG27dOOQQG27fG27fO9^Q(C[OG27fOOQQG27nG27nO&BpQ$IUOG25POOQOLD*^LD*^OOQQ!$(!T!$(!TO#$vQSO!$(!TO!&VQ,UO!$(!TO&BzQ(CjOG26{OOQ(CWG26pG26pOOQQLD-OLD-OO%L`QSOLD-OOOQQLD-QLD-QOOQQ!)9Eo!)9EoO#$vQSO!)9EoOOQQ!$(!j!$(!jOOQQ!.K;Z!.K;ZO&E]Q$IUOG26{O!){QUO'#DvO0xQSO'#ETO&GRQbO'#JdO!){QUO'#DnO&GYQUO'#DzO&GaQbO'#CfO&IwQbO'#CfO!){QUO'#D|O&JXQUO,5;SO!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO'#IgO&L[QSO,5<cO&LdQ,UO,5;^O&MwQ,UO,5;^O!){QUO,5;rO0{QSO'#DSO0{QSO'#DSO!&VQ,UO'#FxO&LdQ,UO'#FxO!&VQ,UO'#FzO&LdQ,UO'#FzO!&VQ,UO'#GYO&LdQ,UO'#GYO!){QUO,5:fO!){QUO,5@`O&JXQUO1G0nO&NOQ$IUO'#CfO!){QUO1G1zO!&VQ,UO,5=PO&LdQ,UO,5=PO!&VQ,UO,5=RO&LdQ,UO,5=RO!&VQ,UO,5<mO&LdQ,UO,5<mO&JXQUO1G1{O!){QUO7+&uO!&VQ,UO1G2XO&LdQ,UO1G2XO!&VQ,UO1G2ZO&LdQ,UO1G2ZO&JXQUO7+'gO&JXQUO7+&YO!&VQ,UOANAaO&LdQ,UOANAaO&NYQSO'#EhO&N_QSO'#EhO&NgQSO'#FWO&NlQSO'#ErO&NqQSO'#JtO&N|QSO'#JrO' XQSO,5;SO' ^Q,UO,5<`O' eQSO'#GRO' jQSO'#GRO' oQSO,5<aO' wQSO,5;SO'!PQ$IUO1G1ZO'!WQSO,5<mO'!]QSO,5<mO'!bQSO,5<oO'!gQSO,5<oO'!lQSO1G1{O'!qQSO1G0nO'!vQ,UO<<KuO'!}Q,UO<<KuO7aQ,UO'#FvO8wQSO'#FuOAOQSO'#EgO!){QUO,5;oO!2uQSO'#GRO!2uQSO'#GRO!2uQSO'#GTO!2uQSO'#GTO!'oQ,UO7+(ZO!'oQ,UO7+(ZO$KZQ`O1G2oO$KZQ`O1G2oO!&VQ,UO,5=TO!&VQ,UO,5=T",
  stateData:
    "'$W~O'nOS'oOSROS'pRQ~OPYOQYOV!UO^qOayObxOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!ctO!hZO!kYO!lYO!mYO!ouO!qvO!twO!x]O#p!OO$Q{O$UfO%`|O%b!PO%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO%q!TO%}!VO&T!WO&V!XO&X!YO&Z!ZO&^![O&d!]O&j!^O&l!_O&n!`O&p!aO&r!bO'uSO'wTO'zUO(SVO(b[O(oiO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~O^!uOl!mO|!nO![!wO!]!tO!^!tO!x9qO!|!oO!}!oO#O!vO#P!oO#Q!oO#T!xO#U!xO'v!kO'wTO'zUO(V!lO(b!rO~O'p!yO~OPYXXYX^YXkYXyYXzYX|YX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX'lYX(SYX(cYX(jYX(kYX~O!a$zX~P(jO[!{O'w!}O'x!{O'y!}O~O[#OO'y!}O'z!}O'{#OO~Oq#QO!O#RO(T#RO(U#TO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u9uO'wTO'zUO(SVO(b[O(oiO~O!U#XO!V#UO!S(YP!S(gP~P+vO!W#aO~P`OPYOQYOa!iOb!hOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'wTO'zUO(SVO(b[O(oiO~Oi#kO!U#gO!x]O#b#jO#c#gO'u9vO!g(dP~P.bO!h#mO'u#lO~O!t#qO!x]O%`#rO~O#d#sO~O!a#tO#d#sO~OP$[OX$cOk$POy#xOz#yO|#zO!V$`O!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O^(WX'l(WX'j(WX!g(WX!S(WX!X(WX%a(WX!a(WX~P1jO#X$dO#{$dOP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#o(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX!X(XX%a(XX~O^(XX!f(XX'l(XX'j(XX!S(XX!g(XXo(XX!a(XX~P4QO#X$dO~O$W$fO$Y$eO$a$kO~O!X$lO$UfO$d$mO$f$oO~Oi%ROk$sOl$rOm$rOs%SOu%TOw%UO|$zO!X${O!c%ZO!h$wO#c%[O$Q%XO$m%VO$o%WO$r%YO'u$qO'wTO'zUO(O%QO(S$tOd(PP~O!h%]O~O|%`O!X%aO'u%_O~O!a%eO~O^%fO'l%fO~O'v!kO~P%TO%f%mO~P%TO!h%]O'u%_O'v!kO(O%QO~Ob%tO!h%]O'u%_O~O#o$RO~Oy%yO!X%vO!h%xO%b%|O'u%_O'v!kO'wTO'zUO](xP~O!t#qO~O%k&OO|(tX!X(tX'u(tX~O'u&PO~O!q&UO#p!OO%b!PO%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO~Oa&ZOb&YO!t&WO%`&XO%s&VO~P;kOa&^ObxO!X&]O!q&UO!twO!x]O#p!OO%`|O%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO%q!TO~O_&aO#X&dO%b&_O'v!kO~P<pO!h&eO!q&iO~O!h#mO~O!XXO~O^%fO'k&qO'l%fO~O^%fO'k&tO'l%fO~O^%fO'k&vO'l%fO~O'jYX!SYXoYX!gYX&RYX!XYX%aYX!aYX~P(jO!['TO!]&|O!^&|O'v!kO'wTO'zUO~Ol&zO|&yO!U&}O(V&xO!W(ZP!W(iP~P?wOg'WO!X'UO'u%_O~Ob']O!h%]O'u%_O~Oy%yO!h%xO~Ol!mO|!nO!x9qO!|!oO!}!oO#P!oO#Q!oO'v!kO'wTO'zUO(V!lO(b!rO~O!['cO!]'bO!^'bO#O!oO#T'dO#U'dO~PAcO^%fO!a#tO!h%]O'l%fO(O%QO(c'fO~O!l'jO#X'hO~PBqOl!mO|!nO'wTO'zUO(V!lO(b!rO~O!XXOl(`X|(`X![(`X!](`X!^(`X!x(`X!|(`X!}(`X#O(`X#P(`X#Q(`X#T(`X#U(`X'v(`X'w(`X'z(`X(V(`X(b(`X~O!]'bO!^'bO'v!kO~PCaO'q'nO'r'nO's'pO~O[!{O'w'rO'x!{O'y'rO~O[#OO'y'rO'z'rO'{#OO~Oq#QO!O#RO(T#RO(U'vO~O!U'xO!S&}X!S'TX!V&}X!V'TX~P+vO!V'zO!S(YX~OP$[OX$cOk$POy#xOz#yO|#zO!V'zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O!S(YX~PGTO!S(PO~O!S(fX!V(fX!a(fX!g(fX(c(fX~O#X(fX#d#]X!W(fX~PIZO#X(QO!S(hX!V(hX~O!V(RO!S(gX~O!S(UO~O#X$dO~PIZO!W(VO~P`Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!jaX!jak!ja!V!ja!e!ja!l!ja#g!ja#h!ja#i!ja#j!ja#k!ja#l!ja#m!ja#n!ja#o!ja#q!ja#s!ja#u!ja#v!ja(c!ja(j!ja(k!ja~O^!ja'l!ja'j!ja!S!ja!g!jao!ja!X!ja%a!ja!a!ja~PJqO!g(WO~O!a#tO#X(XO(c'fO!V(eX^(eX'l(eX~O!g(eX~PMaO|%`O!X%aO!x]O#b(^O#c(]O'u%_O~O!V(_O!g(dX~O!g(aO~O|%`O!X%aO#c(]O'u%_O~OP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!f(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#o(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX~O!a#tO!g(XX~PN}Oy(bOz(cO!f#vO!h#wO!x!wa|!wa~O!t!wa%`!wa!X!wa#b!wa#c!wa'u!wa~P!#RO!t(gO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~Oi%ROk$sOl$rOm$rOs%SOu%TOw:ZO|$zO!X${O!c;eO!h$wO#c:aO$Q%XO$m:]O$o:_O$r%YO'u(kO'wTO'zUO(O%QO(S$tO~O#d(mO~Oi%ROk$sOl$rOm$rOs%SOu%TOw%UO|$zO!X${O!c%ZO!h$wO#c%[O$Q%XO$m%VO$o%WO$r%YO'u(kO'wTO'zUO(O%QO(S$tO~Od(]P~P!'oO!U(qO!g(^P~P%TO(V(sO(b[O~O|(uO!h#wO(V(sO(b[O~OP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!X!dO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'u)TO'wTO'zUO(SVO(b[O(o;_O~Oz)WO!h#wO~O!V$`O^$ka'l$ka'j$ka!g$ka!S$ka!X$ka%a$ka!a$ka~O#p)[O~P!&VOy)_O!a)^O!X$XX$T$XX$W$XX$Y$XX$a$XX~O!a)^O!X(lX$T(lX$W(lX$Y(lX$a(lX~Oy)_O~P!-eOy)_O!X(lX$T(lX$W(lX$Y(lX$a(lX~O!X)aO$T)eO$W)`O$Y)`O$a)fO~O!U)iO~P!){O$W$fO$Y$eO$a)mO~Og$sXy$sX|$sX!f$sX(j$sX(k$sX~OdfXd$sXgfX!VfX#XfX~P!/ZOl)oO~Oq)pO(T)qO(U)sO~Og)|Oy)uO|)vO(j)xO(k)zO~Od)tO~P!0dOd)}O~Oi%ROk$sOl$rOm$rOs%SOu%TOw:ZO|$zO!X${O!c;eO!h$wO#c:aO$Q%XO$m:]O$o:_O$r%YO'wTO'zUO(O%QO(S$tO~O!U*RO'u*OO!g(pP~P!1RO#d*TO~O!h*UO~O!U*ZO'u*WO!S(qP~P!1ROk*gO|*_O![*eO!]*^O!^*^O!h*UO#T*fO%W*aO'v!kO(V!lO~O!W*dO~P!3XO!f#vOg(RXy(RX|(RX(j(RX(k(RX!V(RX#X(RX~Od(RX#y(RX~P!4QOg*jO#X*iOd(QX!V(QX~O!V*kOd(PX~O'u&POd(PP~O!h*rO~O'u(kO~Oi*vO|%`O!U#gO!X%aO!x]O#b#jO#c#gO'u%_O!g(dP~O!a#tO#d*wO~O|%`O!U*yO!V(RO!X%aO'u%_O!S(gP~Ol'QO|*{O!U*zO'wTO'zUO(V(sO~O!W(iP~P!6{O!V*|O^(uX'l(uX~OP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O^!ba!V!ba'l!ba'j!ba!S!ba!g!bao!ba!X!ba%a!ba!a!ba~P!7sOy#xOz#yO|#zO!f#vO!h#wO(SVOP!naX!nak!na!V!na!e!na!l!na#g!na#h!na#i!na#j!na#k!na#l!na#m!na#n!na#o!na#q!na#s!na#u!na#v!na(c!na(j!na(k!na~O^!na'l!na'j!na!S!na!g!nao!na!X!na%a!na!a!na~P!:^Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!paX!pak!pa!V!pa!e!pa!l!pa#g!pa#h!pa#i!pa#j!pa#k!pa#l!pa#m!pa#n!pa#o!pa#q!pa#s!pa#u!pa#v!pa(c!pa(j!pa(k!pa~O^!pa'l!pa'j!pa!S!pa!g!pao!pa!X!pa%a!pa!a!pa~P!<wOg+VO!X'UO%a+UO(O%QO~O!a+XO^'}X!X'}X'l'}X!V'}X~O^%fO!XXO'l%fO~O!h%]O(O%QO~O!h%]O'u%_O(O%QO~O!a#tO#d(mO~O%b+eO'u+aO'wTO'zUO!W(yP~O!V+fO](xX~OX+jO~O]+kO~O!X%vO'u%_O'v!kO](xP~O#X+pO(O%QO~Og+sO!X${O(O%QO~O!X+uO~Oy+wO!XXO~O%f%mO~O!t+|O~Ob,RO~O'u#lO!W(wP~Ob%tO~O%b!PO'u&PO~P<pOX,XO],WO~OPYOQYOayObxOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!ctO!hZO!kYO!lYO!mYO!ouO!twO!x]O$UfO%`|O'wTO'zUO(SVO(b[O(oiO~O!X!dO!q!fO$Q!jO'u!cO~P!CnO],WO^%fO'l%fO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~O^,^O!qvO#p}O%d}O%e}O%f}O~P!FWO!h&eO~O&T,dO~O!X,fO~O&f,hO&h,iOP&caQ&caV&ca^&caa&cab&cai&cak&cal&cam&cas&cau&caw&ca|&ca!Q&ca!R&ca!X&ca!c&ca!h&ca!k&ca!l&ca!m&ca!o&ca!q&ca!t&ca!x&ca#p&ca$Q&ca$U&ca%`&ca%b&ca%d&ca%e&ca%f&ca%i&ca%k&ca%n&ca%o&ca%q&ca%}&ca&T&ca&V&ca&X&ca&Z&ca&^&ca&d&ca&j&ca&l&ca&n&ca&p&ca&r&ca'j&ca'u&ca'w&ca'z&ca(S&ca(b&ca(o&ca!W&ca&[&ca_&ca&a&ca~O'u,nO~O!V{X!V!_X!W{X!W!_X!a{X!a!_X!h!_X#X{X(O!_X~O!a,sO#X,rO!V#aX!V([X!W#aX!W([X!a([X!h([X(O([X~O!a,uO!h%]O(O%QO!V!ZX!W!ZX~Ol!mO|!nO'wTO'zUO(V!lO~OP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!X!dO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'wTO'zUO(SVO(b[O(o;_O~O'u:fO~P# ^O!V,yO!W(ZX~O!W,{O~O!a,sO#X,rO!V#aX!W#aX~O!V,|O!W(iX~O!W-OO~O!]-PO!^-PO'v!kO~P!N{O!W-SO~P'WOg-VO!X'UO~O!S-[O~Ol!wa![!wa!]!wa!^!wa!|!wa!}!wa#O!wa#P!wa#Q!wa#T!wa#U!wa'v!wa'w!wa'z!wa(V!wa(b!wa~P!#RO!l-aO#X-_O~PBqO!]-cO!^-cO'v!kO~PCaO^%fO#X-_O'l%fO~O^%fO!a#tO#X-_O'l%fO~O^%fO!a#tO!l-aO#X-_O'l%fO(c'fO~O'q'nO'r'nO's-hO~Oo-iO~O!S&}a!V&}a~P!7sO!U-mO!S&}X!V&}X~P%TO!V'zO!S(Ya~O!S(Ya~PGTO!V(RO!S(ga~O|%`O!U-qO!X%aO'u%_O!S'TX!V'TX~O#X-sO!V(ea!g(ea^(ea'l(ea~O!a#tO~P#)dO!V(_O!g(da~O|%`O!X%aO#c-wO'u%_O~Oi-|O|%`O!U-yO!X%aO!x]O#b-{O#c-yO'u%_O!V'WX!g'WX~Oz.QO!h#wO~Og.TO!X'UO%a.SO(O%QO~O^#[i!V#[i'l#[i'j#[i!S#[i!g#[io#[i!X#[i%a#[i!a#[i~P!7sOg;kOy)uO|)vO(j)xO(k)zO~O#d#Wa^#Wa#X#Wa'l#Wa!V#Wa!g#Wa!X#Wa!S#Wa~P#,`O#d(RXP(RXX(RX^(RXk(RXz(RX!e(RX!h(RX!l(RX#g(RX#h(RX#i(RX#j(RX#k(RX#l(RX#m(RX#n(RX#o(RX#q(RX#s(RX#u(RX#v(RX'l(RX(S(RX(c(RX!g(RX!S(RX'j(RXo(RX!X(RX%a(RX!a(RX~P!4QO!V.^Od(]X~P!0dOd.`O~O!V.aO!g(^X~P!7sO!g.dO~O!S.fO~OP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O(SVOX#fi^#fik#fi!V#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O#g#fi~P#0[O#g#}O~P#0[OP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO(SVOX#fi^#fi!V#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~Ok#fi~P#2|Ok$PO~P#2|OP$[Ok$POy#xOz#yO|#zO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO(SVO^#fi!V#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P#5nOX$cO!e$RO#l$RO#m$RO#n$bO#o$RO~P#5nOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO(SVO^#fi!V#fi#s#fi#u#fi#v#fi'l#fi(c#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(j#fi~P#8oO(j#{O~P#8oOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO(SVO(j#{O^#fi!V#fi#u#fi#v#fi'l#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(k#fi~P#;aO(k#|O~P#;aOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO(SVO(j#{O(k#|O~O^#fi!V#fi#v#fi'l#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#>ROPYXXYXkYXyYXzYX|YX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX!VYX!WYX~O#yYX~P#@lOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO#u:SO#v:TO(SVO(c$YO(j#{O(k#|O~O#y.hO~P#ByO#X:YO#{:YO#y(XX!W(XX~PN}O^'Za!V'Za'l'Za'j'Za!g'Za!S'Zao'Za!X'Za%a'Za!a'Za~P!7sOP#fiX#fi^#fik#fiz#fi!V#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(S#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#,`O^#zi!V#zi'l#zi'j#zi!S#zi!g#zio#zi!X#zi%a#zi!a#zi~P!7sO$W.mO$Y.mO~O$W.nO$Y.nO~O!a)^O#X.oO!X$^X$T$^X$W$^X$Y$^X$a$^X~O!U.pO~O!X)aO$T.rO$W)`O$Y)`O$a.sO~O!V:UO!W(WX~P#ByO!W.tO~O!a)^O$a(lX~O$a.vO~Oq)pO(T)qO(U.yO~O!S.}O~P!&VO!VcX!acX!gcX!g$sX(ccX~P!/ZO!g/TO~P#,`O!V/UO!a#tO(c'fO!g(pX~O!g/ZO~O!U*RO'u%_O!g(pP~O#d/]O~O!S$sX!V$sX!a$zX~P!/ZO!V/^O!S(qX~P#,`O!a/`O~O!S/bO~Ok/fO!a#tO!h%]O(O%QO(c'fO~O'u/hO~O!a+XO~O^%fO!V/lO'l%fO~O!W/nO~P!3XO!]/oO!^/oO'v!kO(V!lO~O|/qO(V!lO~O#T/rO~O'u&POd'`X!V'`X~O!V*kOd(Pa~Od/wO~Oy/xOz/xO|/yOgva(jva(kva!Vva#Xva~Odva#yva~P$ aOy)uO|)vOg$la(j$la(k$la!V$la#X$la~Od$la#y$la~P$!VOy)uO|)vOg$na(j$na(k$na!V$na#X$na~Od$na#y$na~P$!xO#d/{O~Od$|a!V$|a#X$|a#y$|a~P!0dO!a#tO~O#d0OO~O!V*|O^(ua'l(ua~Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!niX!nik!ni!V!ni!e!ni!l!ni#g!ni#h!ni#i!ni#j!ni#k!ni#l!ni#m!ni#n!ni#o!ni#q!ni#s!ni#u!ni#v!ni(c!ni(j!ni(k!ni~O^!ni'l!ni'j!ni!S!ni!g!nio!ni!X!ni%a!ni!a!ni~P$$gOg.TO!X'UO%a.SO~Oi0YO'u0XO~P!1UO!a+XO^'}a!X'}a'l'}a!V'}a~O#d0`O~OXYX!VcX!WcX~O!V0aO!W(yX~O!W0cO~OX0dO~O'u+aO'wTO'zUO~O!X%vO'u%_O]'hX!V'hX~O!V+fO](xa~O!g0iO~P!7sOX0lO~O]0mO~O#X0pO~Og0sO!X${O~O(V(sO!W(vP~Og0|O!X0yO%a0{O(O%QO~OX1WO!V1UO!W(wX~O!W1XO~O]1ZO^%fO'l%fO~O'u#lO'wTO'zUO~O#X$dO#{$dOP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX~O#o1^O&R1_O^(XX!f(XX~P$+]O#X$dO#o1^O&R1_O~O^1aO~P%TO^1cO~O&[1fOP&YiQ&YiV&Yi^&Yia&Yib&Yii&Yik&Yil&Yim&Yis&Yiu&Yiw&Yi|&Yi!Q&Yi!R&Yi!X&Yi!c&Yi!h&Yi!k&Yi!l&Yi!m&Yi!o&Yi!q&Yi!t&Yi!x&Yi#p&Yi$Q&Yi$U&Yi%`&Yi%b&Yi%d&Yi%e&Yi%f&Yi%i&Yi%k&Yi%n&Yi%o&Yi%q&Yi%}&Yi&T&Yi&V&Yi&X&Yi&Z&Yi&^&Yi&d&Yi&j&Yi&l&Yi&n&Yi&p&Yi&r&Yi'j&Yi'u&Yi'w&Yi'z&Yi(S&Yi(b&Yi(o&Yi!W&Yi_&Yi&a&Yi~O_1lO!W1jO&a1kO~P`O!XXO!h1nO~O&h,iOP&ciQ&ciV&ci^&cia&cib&cii&cik&cil&cim&cis&ciu&ciw&ci|&ci!Q&ci!R&ci!X&ci!c&ci!h&ci!k&ci!l&ci!m&ci!o&ci!q&ci!t&ci!x&ci#p&ci$Q&ci$U&ci%`&ci%b&ci%d&ci%e&ci%f&ci%i&ci%k&ci%n&ci%o&ci%q&ci%}&ci&T&ci&V&ci&X&ci&Z&ci&^&ci&d&ci&j&ci&l&ci&n&ci&p&ci&r&ci'j&ci'u&ci'w&ci'z&ci(S&ci(b&ci(o&ci!W&ci&[&ci_&ci&a&ci~O!S1tO~O!V!Za!W!Za~P#ByOl!mO|!nO!U1zO(V!lO!V'OX!W'OX~P?wO!V,yO!W(Za~O!V'UX!W'UX~P!6{O!V,|O!W(ia~O!W2RO~P'WO^%fO#X2[O'l%fO~O^%fO!a#tO#X2[O'l%fO~O^%fO!a#tO!l2`O#X2[O'l%fO(c'fO~O^%fO'l%fO~P!7sO!V$`Oo$ka~O!S&}i!V&}i~P!7sO!V'zO!S(Yi~O!V(RO!S(gi~O!S(hi!V(hi~P!7sO!V(ei!g(ei^(ei'l(ei~P!7sO#X2bO!V(ei!g(ei^(ei'l(ei~O!V(_O!g(di~O|%`O!X%aO!x]O#b2gO#c2fO'u%_O~O|%`O!X%aO#c2fO'u%_O~Og2nO!X'UO%a2mO~Og2nO!X'UO%a2mO(O%QO~O#dvaPvaXva^vakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva'lva(Sva(cva!gva!Sva'jvaova!Xva%ava!ava~P$ aO#d$laP$laX$la^$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la'l$la(S$la(c$la!g$la!S$la'j$lao$la!X$la%a$la!a$la~P$!VO#d$naP$naX$na^$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na'l$na(S$na(c$na!g$na!S$na'j$nao$na!X$na%a$na!a$na~P$!xO#d$|aP$|aX$|a^$|ak$|az$|a!V$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a'l$|a(S$|a(c$|a!g$|a!S$|a'j$|a#X$|ao$|a!X$|a%a$|a!a$|a~P#,`O^#[q!V#[q'l#[q'j#[q!S#[q!g#[qo#[q!X#[q%a#[q!a#[q~P!7sOd'PX!V'PX~P!'oO!V.^Od(]a~O!U2vO!V'QX!g'QX~P%TO!V.aO!g(^a~O!V.aO!g(^a~P!7sO!S2yO~O#y!ja!W!ja~PJqO#y!ba!V!ba!W!ba~P#ByO#y!na!W!na~P!:^O#y!pa!W!pa~P!<wO!X3]O$UfO$_3^O~O!W3bO~Oo3cO~P#,`O^$hq!V$hq'l$hq'j$hq!S$hq!g$hqo$hq!X$hq%a$hq!a$hq~P!7sO!S3dO~P#,`Oy)uO|)vO(k)zOg%Xi(j%Xi!V%Xi#X%Xi~Od%Xi#y%Xi~P$IuOy)uO|)vOg%Zi(j%Zi(k%Zi!V%Zi#X%Zi~Od%Zi#y%Zi~P$JhO(c$YO~P#,`O!U3gO'u%_O!V'[X!g'[X~O!V/UO!g(pa~O!V/UO!a#tO!g(pa~O!V/UO!a#tO(c'fO!g(pa~Od$ui!V$ui#X$ui#y$ui~P!0dO!U3oO'u*WO!S'^X!V'^X~P!1RO!V/^O!S(qa~O!V/^O!S(qa~P#,`O!a#tO#o3wO~Ok3zO!a#tO(c'fO~Od(Qi!V(Qi~P!0dO#X3}Od(Qi!V(Qi~P!0dO!g4QO~O^$iq!V$iq'l$iq'j$iq!S$iq!g$iqo$iq!X$iq%a$iq!a$iq~P!7sO!S4UO~O!V4VO!X(rX~P#,`O!f#vO~P4QO^$sX!X$sX%UYX'l$sX!V$sX~P!/ZO%U4XO^hXghXyhX|hX!XhX'lhX(jhX(khX!VhX~O%U4XO~O%b4`O'u+aO'wTO'zUO!V'gX!W'gX~O!V0aO!W(ya~OX4dO~O]4eO~O^%fO'l%fO~P#,`O!X${O~P#,`O!V4mO#X4oO!W(vX~O!W4pO~Ol!mO|4qO![!wO!]!tO!^!tO!x9qO!|!oO!}!oO#O!oO#P!oO#Q!oO#T4vO#U!xO'v!kO'wTO'zUO(V!lO(b!rO~O!W4uO~P%$gOg4{O!X0yO%a4zO~Og4{O!X0yO%a4zO(O%QO~O'u#lO!V'fX!W'fX~O!V1UO!W(wa~O'wTO'zUO(V5UO~O]5YO~O#o5]O&R5^O~PMaO!g5_O~P%TO^5aO~O^5aO~P%TO_1lO!W5fO&a1kO~P`O!a5hO~O!a5jO!V([i!W([i!a([i!h([i(O([i~O!V#ai!W#ai~P#ByO#X5kO!V#ai!W#ai~O!V!Zi!W!Zi~P#ByO^%fO#X5tO'l%fO~O^%fO!a#tO#X5tO'l%fO~O!V(eq!g(eq^(eq'l(eq~P!7sO!V(_O!g(dq~O|%`O!X%aO#c5{O'u%_O~O!X'UO%a6OO~Og6RO!X'UO%a6OO~O#d%XiP%XiX%Xi^%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi'l%Xi(S%Xi(c%Xi!g%Xi!S%Xi'j%Xio%Xi!X%Xi%a%Xi!a%Xi~P$IuO#d%ZiP%ZiX%Zi^%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi'l%Zi(S%Zi(c%Zi!g%Zi!S%Zi'j%Zio%Zi!X%Zi%a%Zi!a%Zi~P$JhO#d$uiP$uiX$ui^$uik$uiz$ui!V$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui'l$ui(S$ui(c$ui!g$ui!S$ui'j$ui#X$uio$ui!X$ui%a$ui!a$ui~P#,`Od'Pa!V'Pa~P!0dO!V'Qa!g'Qa~P!7sO!V.aO!g(^i~O#y#[i!V#[i!W#[i~P#ByOP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O(SVOX#fik#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~O#g#fi~P%2vO#g9yO~P%2vOP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO(SVOX#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~Ok#fi~P%5ROk9{O~P%5ROP$[Ok9{Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O(SVO#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P%7^OX:XO!e9}O#l9}O#m9}O#n:WO#o9}O~P%7^OP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO(SVO#s#fi#u#fi#v#fi#y#fi(c#fi(k#fi!V#fi!W#fi~O(j#fi~P%9xO(j#{O~P%9xOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO(SVO(j#{O#u#fi#v#fi#y#fi(c#fi!V#fi!W#fi~O(k#fi~P%<TO(k#|O~P%<TOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO#u:SO(SVO(j#{O(k#|O~O#v#fi#y#fi(c#fi!V#fi!W#fi~P%>`O^#wy!V#wy'l#wy'j#wy!S#wy!g#wyo#wy!X#wy%a#wy!a#wy~P!7sOg;lOy)uO|)vO(j)xO(k)zO~OP#fiX#fik#fiz#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(S#fi(c#fi!V#fi!W#fi~P%AWO!f#vOP(RXX(RXg(RXk(RXy(RXz(RX|(RX!e(RX!h(RX!l(RX#g(RX#h(RX#i(RX#j(RX#k(RX#l(RX#m(RX#n(RX#o(RX#q(RX#s(RX#u(RX#v(RX#y(RX(S(RX(c(RX(j(RX(k(RX!V(RX!W(RX~O#y#zi!V#zi!W#zi~P#ByO#y!ni!W!ni~P$$gO!W6_O~O!V'Za!W'Za~P#ByO!a#tO(c'fO!V'[a!g'[a~O!V/UO!g(pi~O!V/UO!a#tO!g(pi~Od$uq!V$uq#X$uq#y$uq~P!0dO!S'^a!V'^a~P#,`O!a6fO~O!V/^O!S(qi~P#,`O!V/^O!S(qi~O!S6jO~O!a#tO#o6oO~Ok6pO!a#tO(c'fO~O!S6rO~Od$wq!V$wq#X$wq#y$wq~P!0dO^$iy!V$iy'l$iy'j$iy!S$iy!g$iyo$iy!X$iy%a$iy!a$iy~P!7sO!a5jO~O!V4VO!X(ra~O^#[y!V#[y'l#[y'j#[y!S#[y!g#[yo#[y!X#[y%a#[y!a#[y~P!7sOX6wO~O!V0aO!W(yi~O]6}O~O(V(sO!V'cX!W'cX~O!V4mO!W(va~OikO'u7UO~P.bO!W7XO~P%$gOl!mO|7YO'wTO'zUO(V!lO(b!rO~O!X0yO~O!X0yO%a7[O~Og7_O!X0yO%a7[O~OX7dO!V'fa!W'fa~O!V1UO!W(wi~O!g7hO~O!g7iO~O!g7lO~O!g7lO~P%TO^7nO~O!a7oO~O!g7pO~O!V(hi!W(hi~P#ByO^%fO#X7xO'l%fO~O!V(ey!g(ey^(ey'l(ey~P!7sO!V(_O!g(dy~O!X'UO%a7{O~O#d$uqP$uqX$uq^$uqk$uqz$uq!V$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq'l$uq(S$uq(c$uq!g$uq!S$uq'j$uq#X$uqo$uq!X$uq%a$uq!a$uq~P#,`O#d$wqP$wqX$wq^$wqk$wqz$wq!V$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq'l$wq(S$wq(c$wq!g$wq!S$wq'j$wq#X$wqo$wq!X$wq%a$wq!a$wq~P#,`O!V'Qi!g'Qi~P!7sO#y#[q!V#[q!W#[q~P#ByOy/xOz/xO|/yOPvaXvagvakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva#yva(Sva(cva(jva(kva!Vva!Wva~Oy)uO|)vOP$laX$lag$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la#y$la(S$la(c$la(j$la(k$la!V$la!W$la~Oy)uO|)vOP$naX$nag$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na#y$na(S$na(c$na(j$na(k$na!V$na!W$na~OP$|aX$|ak$|az$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a#y$|a(S$|a(c$|a!V$|a!W$|a~P%AWO#y$hq!V$hq!W$hq~P#ByO#y$iq!V$iq!W$iq~P#ByO!W8VO~O#y8WO~P!0dO!a#tO!V'[i!g'[i~O!a#tO(c'fO!V'[i!g'[i~O!V/UO!g(pq~O!S'^i!V'^i~P#,`O!V/^O!S(qq~O!S8^O~P#,`O!S8^O~Od(Qy!V(Qy~P!0dO!V'aa!X'aa~P#,`O^%Tq!X%Tq'l%Tq!V%Tq~P#,`OX8cO~O!V0aO!W(yq~O#X8gO!V'ca!W'ca~O!V4mO!W(vi~P#ByOPYXXYXkYXyYXzYX|YX!SYX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX~O!a%RX#o%RX~P&2WO!X0yO%a8kO~O'wTO'zUO(V8pO~O!V1UO!W(wq~O!g8sO~O!g8tO~O!g8uO~O!g8uO~P%TO#X8xO!V#ay!W#ay~O!V#ay!W#ay~P#ByO!X'UO%a8}O~O#y#wy!V#wy!W#wy~P#ByOP$uiX$uik$uiz$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui#y$ui(S$ui(c$ui!V$ui!W$ui~P%AWOy)uO|)vO(k)zOP%XiX%Xig%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi#y%Xi(S%Xi(c%Xi(j%Xi!V%Xi!W%Xi~Oy)uO|)vOP%ZiX%Zig%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi#y%Zi(S%Zi(c%Zi(j%Zi(k%Zi!V%Zi!W%Zi~O#y$iy!V$iy!W$iy~P#ByO#y#[y!V#[y!W#[y~P#ByO!a#tO!V'[q!g'[q~O!V/UO!g(py~O!S'^q!V'^q~P#,`O!S9UO~P#,`O!V0aO!W(yy~O!V4mO!W(vq~O!X0yO%a9]O~O!g9`O~O!X'UO%a9eO~OP$uqX$uqk$uqz$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq#y$uq(S$uq(c$uq!V$uq!W$uq~P%AWOP$wqX$wqk$wqz$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq#y$wq(S$wq(c$wq!V$wq!W$wq~P%AWOd%]!Z!V%]!Z#X%]!Z#y%]!Z~P!0dO!V'cq!W'cq~P#ByO!V#a!Z!W#a!Z~P#ByO#d%]!ZP%]!ZX%]!Z^%]!Zk%]!Zz%]!Z!V%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z'l%]!Z(S%]!Z(c%]!Z!g%]!Z!S%]!Z'j%]!Z#X%]!Zo%]!Z!X%]!Z%a%]!Z!a%]!Z~P#,`OP%]!ZX%]!Zk%]!Zz%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z#y%]!Z(S%]!Z(c%]!Z!V%]!Z!W%]!Z~P%AWOo(WX~P1jO'v!kO~P!){O!ScX!VcX#XcX~P&2WOPYXXYXkYXyYXzYX|YX!VYX!VcX!eYX!fYX!hYX!lYX#XYX#XcX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX~O!acX!gYX!gcX(ccX~P&GnOP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!XXO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'u)TO'wTO'zUO(SVO(b[O(o;_O~O!V:UO!W$ka~Oi%ROk$sOl$rOm$rOs%SOu%TOw:[O|$zO!X${O!c;fO!h$wO#c:bO$Q%XO$m:^O$o:`O$r%YO'u(kO'wTO'zUO(O%QO(S$tO~O#p)[O~P&LdO!WYX!WcX~P&GnO#d9xO~O!a#tO#d9xO~O#X:YO~O#o9}O~O#X:dO!V(hX!W(hX~O#X:YO!V(fX!W(fX~O#d:eO~Od:gO~P!0dO#d:lO~O#d:mO~O!a#tO#d:nO~O!a#tO#d:eO~O#y:oO~P#ByO#d:pO~O#d:qO~O#d:rO~O#d:sO~O#d:tO~O#d:uO~O#y:vO~P!0dO#y:wO~P!0dO$U~!f!|!}#P#Q#T#b#c#n(o$m$o$r%U%`%a%b%i%k%n%o%q%s~'pR$U(o#h!R'n'v#il#g#jky'o(V'o'u$W$Y$W~",
  goto: "$&a(}PPPP)OP)RP)cP*r.uPPPP5UPP5kP;f>mP?QP?QPPP?QP@rP?QP?QP?QP@vPP@{PAfPF]PPPFaPPPPFaIaPPPIgJbPFaPLoPPPPN}FaPPPFaPFaP!#]FaP!&p!'r!'{P!(n!(r!(nPPPPP!+|!'rPP!,j!-dP!0WFaFa!0]!3f!7z!7z!;oPPP!;vFaPPPPPPPPPPP!?SP!@ePPFa!ArPFaPFaFaFaFaPFa!CUPP!F]P!I`P!Id!In!Ir!IrP!FYP!Iv!IvP!LyP!L}FaFa!MT#!V?QP?QP?Q?QP##a?Q?Q#%]?Q#'l?Q#)b?Q?Q#*O#+|#+|#,Q#,Y#+|#,bP#+|P?Q#,z?Q#.T?Q?Q5UPPP#/aPPP#/y#/yP#/yP#0`#/yPP#0fP#0]P#0]#0x#0]#1d#1j5R)R#1m)RP#1t#1t#1tP)RP)RP)RP)RPP)RP#1z#1}P#1})RP#2RP#2UP)RP)RP)RP)RP)RP)R)RPP#2[#2b#2l#2r#2x#3O#3U#3d#3j#3p#3z#4Q#4[#4k#4q#5b#5t#5z#6Q#6`#6u#8W#8f#8l#8r#8x#9O#9Y#9`#9f#9p#:S#:YPPPPPPPPPP#:`PPPPPPP#;S#>ZP#?j#?q#?yPPPP#DX#F}#Me#Mh#Mk#Nd#Ng#Nj#Nq#NyPP$ P$ T$ {$!z$#O$#dPP$#h$#n$#rP$#u$#y$#|$$r$%Y$%p$%t$%w$%z$&Q$&T$&X$&]R!zRmqOXs!Y#b%e&h&j&k&m,a,f1f1iY!tQ'U-R0y4tQ%kuQ%sxQ%z{Q&`!US&|!d,yQ'[!hS'b!q!wS*^${*cQ+_%tQ+l%|Q,Q&YQ-P'TQ-Z']Q-c'cQ/o*eQ1T,RR:c9t$|dOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{,^,a,f-V-_-m-s.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2v4q4{5]5^5a5t7Y7_7n7xS#o]9q!r)V$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ*n%UQ+d%vQ,S&]Q,Z&eQ.W:ZQ0V+VQ0Z+XQ0f+eQ1],XQ2j.TQ4_0aQ5S1UQ6Q2nQ6W:[Q6y4`R8O6R&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bt!mQ!q!t!w!x&|'T'U'b'c'd,y-P-R-c0y4t4v$^$ri#t#v$b$c$w$z%V%W%[)p)v)y){)|*T*Z*i*j+U+X+p+s.S.^/O/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lQ%}{Q&z!dS'Q%a,|Q+d%vQ/z*rQ0f+eQ0k+kQ1[,WQ1],XQ4_0aQ4h0mQ5V1WQ5W1ZQ6y4`Q6|4eQ7g5YQ8f6}R8q7dpnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iR,U&a&t^OPXYstuvy!Y!_!f!i!n#Q#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y'W'h'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;a;b[#ZWZ#U#X&}'x!S%bm#f#g#j%]%`(R(](^(_*y*z*|,],s-q-w-x-y-{1n2f2g5j5{Q%nwQ%rxS%w{%|Q&T!SQ'X!gQ'Z!hQ(f#qS*Q$w*US+^%s%tQ+b%vQ+{&WQ,P&YS-Y'[']Q.V(gQ/Y*RQ0_+_Q0e+eQ0g+fQ0j+jQ1O+|S1S,Q,RQ2W-ZQ3f/UQ4^0aQ4b0dQ4g0lQ5R1TQ6c3gQ6x4`Q6{4dQ8b6wR9W8cv$yi#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h!S%px!h!s%r%s%t&{'Z'[']'a'k*]+^+_,v-Y-Z-b/g0_2P2W2_3yQ+W%nQ+q&QQ+t&RQ,O&YQ.U(fQ0}+{U1R,P,Q,RQ2o.VQ4|1OS5Q1S1TQ7c5R#O;c#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lg;d:W:X:^:`:b:i:k:m:q:s:wW%Oi%Q*k;_S&Q!P&_Q&R!QQ&S!RR+o&O$_$}i#t#v$b$c$w$z%V%W%[)p)v)y){)|*T*Z*i*j+U+X+p+s.S.^/O/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lT)q$t)rV*o%U:Z:[U'Q!d%a,|S(t#x#yQ+i%yS.O(b(cQ0t+uQ4O/xR7R4m&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;b$i$_c#W#c%i%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.i.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;UT#RV#S&{kOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ'O!dR1{,yv!mQ!d!q!t!w!x&|'T'U'b'c'd,y-P-R-c0y4t4vS*]${*cS/g*^*eQ/p*fQ0v+wQ3y/oR3|/rlqOXs!Y#b%e&h&j&k&m,a,f1f1iQ&o!]Q'l!vS(h#s9xQ+[%qQ+y&TQ+z&VQ-W'YQ-e'eS.[(m:eS/}*w:nQ0]+]Q0x+xQ1m,hQ1o,iQ1w,tQ2U-XQ2X-]S4T0O:tQ4Y0^S4]0`:uQ5l1yQ5p2VQ5u2^Q6v4ZQ7s5nQ7t5qQ7w5vR8w7p$d$^c#W#c%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;US(e#n'_U*h$|(l3YS+R%i.iQ2k0VQ5}2jQ7}6QR9O8O$d$]c#W#c%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;US(d#n'_S(v#y$^S+Q%i.iS.P(c(eQ.l)WQ0S+RR2h.Q&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bS#o]9qQ&j!WQ&k!XQ&m!ZQ&n![R1e,dQ'V!gQ+T%nQ-U'XS.R(f+WQ2S-TW2l.U.V0U0WQ5o2TU5|2i2k2oS7z5}6PS8|7|7}S9c8{9OQ9k9dR9n9lU!uQ'U-RT4r0y4t!O_OXZ`s!U!Y#b#f%]%e&_&a&h&j&k&m(_,a,f-x1f1i]!oQ!q'U-R0y4tT#o]9q%WzOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xS(t#x#yS.O(b(c!s:{$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bY!sQ'U-R0y4tQ'a!qS'k!t!wS'm!x4vS-b'b'cQ-d'dR2_-cQ'j!sS(Z#e1`S-a'a'mQ/X*QQ/e*]Q2`-dQ3k/YS3t/f/pQ6b3fS6m3z3|Q8Y6cR8a6pQ#ubQ'i!sS(Y#e1`S([#k*vQ*x%^Q+Y%oQ+`%uU-`'a'j'mQ-t(ZQ/W*QQ/d*]Q/j*`Q0[+ZQ1P+}S2]-a-dQ2e-|S3j/X/YS3s/e/pQ3v/iQ3x/kQ5O1QQ5w2`Q6a3fQ6e3kS6i3t3|Q6n3{Q7a5PS8X6b6cQ8]6jQ8_6mQ8n7bQ9S8YQ9T8^Q9V8aQ9_8oQ9g9UQ;O:yQ;Z;SR;[;TV!uQ'U-R%WaOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xS#uy!i!r:x$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bR;O;a%WbOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xQ%^j!S%ox!h!s%r%s%t&{'Z'[']'a'k*]+^+_,v-Y-Z-b/g0_2P2W2_3yS%uy!iQ+Z%pQ+}&YW1Q,O,P,Q,RU5P1R1S1TS7b5Q5RQ8o7c!r:y$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ;S;`R;T;a$zeOPXYstuv!Y!_!f!n#Q#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xY#`WZ#U#X'x!S%bm#f#g#j%]%`(R(](^(_*y*z*|,],s-q-w-x-y-{1n2f2g5j5{Q,[&e!p:z$Z$l)i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bR:}&}S'R!d%aR1},|$|dOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{,^,a,f-V-_-m-s.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2v4q4{5]5^5a5t7Y7_7n7x!r)V$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ,Z&eQ0V+VQ2j.TQ6Q2nR8O6R!f$Tc#W%i'w'}(i(p)P)Q)R)S)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9r!T:P)U)g,w.i1u1x2z3S3T3U3V3Z3a5m6V6[6]7T7r8P8T8U9Y9a;U!b$Vc#W%i'w'}(i(p)R)S)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9r!P:R)U)g,w.i1u1x2z3U3V3Z3a5m6V6[6]7T7r8P8T8U9Y9a;U!^$Zc#W%i'w'}(i(p)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9rQ3e/Sz;b)U)g,w.i1u1x2z3Z3a5m6V6[6]7T7r8P8T8U9Y9a;UQ;g;iR;h;j&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bS$mh$nR3^.o'RgOPWXYZhstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l$n%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.o.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bT$if$oQ$gfS)`$j)dR)l$oT$hf$oT)b$j)d'RhOPWXYZhstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l$n%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.o.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bT$mh$nQ$phR)k$n%WjOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7x!s;`$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;b#alOPXZs!Y!_!n#Q#b#m#z$l%e&a&d&e&h&j&k&m&q&y'W(u)i*{+V,^,a,f-V.T.p/y0|1^1_1a1c1f1i1k2n3]4q4{5]5^5a6R7Y7_7nv$|i#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h#O(l#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lQ*s%YQ.{)ug3Y:W:X:^:`:b:i:k:m:q:s:wv$xi#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;hQ*V$yS*`${*cQ*t%ZQ/k*a#O;Q#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lf;R:W:X:^:`:b:i:k:m:q:s:wQ;V;cQ;W;dQ;X;eR;Y;fv$|i#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h#O(l#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lg3Y:W:X:^:`:b:i:k:m:q:s:wloOXs!Y#b%e&h&j&k&m,a,f1f1iQ*Y$zQ,o&tQ,p&vR3n/^$^$}i#t#v$b$c$w$z%V%W%[)p)v)y){)|*T*Z*i*j+U+X+p+s.S.^/O/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lQ+r&RQ0r+tQ4k0qR7Q4lT*b${*cS*b${*cT4s0y4tS/i*_4qT3{/q7YQ+Y%oQ/j*`Q0[+ZQ1P+}Q5O1QQ7a5PQ8n7bR9_8on)y$u(n*u/[/s/t2s3l4R6`6q9R;P;];^!Y:h(j)Z*P*X.Z.w.|/S/a0T0o0q2r3m3q4j4l6S6T6g6k6s6u8[8`9f;i;j]:i3X6Z8Q9P9Q9op){$u(n*u/Q/[/s/t2s3l4R6`6q9R;P;];^![:j(j)Z*P*X.Z.w.|/S/a0T0o0q2p2r3m3q4j4l6S6T6g6k6s6u8[8`9f;i;j_:k3X6Z8Q8R9P9Q9opnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iQ&[!TR,^&epnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iR&[!TQ+v&SR0n+oqnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iQ0z+{S4y0}1OU7Z4w4x4|S8j7]7^S9Z8i8lQ9h9[R9m9iQ&c!UR,V&_R5V1WS%w{%|R0g+fQ&h!VR,a&iR,g&nT1g,f1iR,k&oQ,j&oR1p,kQ'o!yR-g'oQsOQ#bXT%hs#bQ!|TR'q!|Q#PUR's#PQ)r$tR.x)rQ#SVR'u#SQ#VWU'{#V'|-nQ'|#WR-n'}Q,z'OR1|,zQ._(nR2t._Q.b(pS2w.b2xR2x.cQ-R'UR2Q-RY!qQ'U-R0y4tR'`!qS#]W%`U(S#](T-oQ(T#^R-o(OQ,}'RR2O,}r`OXs!U!Y#b%e&_&a&h&j&k&m,a,f1f1iS#fZ%]U#p`#f-xR-x(_Q(`#hQ-u([W-}(`-u2c5yQ2c-vR5y2dQ)d$jR.q)dQ$nhR)j$nQ$acU)Y$a-j:VQ-j9rR:V)gQ/V*QW3h/V3i6d8ZU3i/W/X/YS6d3j3kR8Z6e#o)w$u(j(n)Z*P*X*p*q*u.X.Y.Z.w.|/Q/R/S/[/a/s/t0T0o0q2p2q2r2s3X3l3m3q4R4j4l6S6T6X6Y6Z6`6g6k6q6s6u8Q8R8S8[8`9P9Q9R9f9o;P;];^;i;jQ/_*XU3p/_3r6hQ3r/aR6h3qQ*c${R/m*cQ*l%PR/v*lQ4W0TR6t4WQ*}%cR0R*}Q4n0tS7S4n8hR8h7TQ+x&TR0w+xQ4t0yR7W4tQ1V,SS5T1V7eR7e5VQ0b+bW4a0b4c6z8dQ4c0eQ6z4bR8d6{Q+g%wR0h+gQ1i,fR5e1iWrOXs#bQ&l!YQ+P%eQ,`&hQ,b&jQ,c&kQ,e&mQ1d,aS1g,f1iR5d1fQ%gpQ&p!^Q&s!`Q&u!aQ&w!bQ'g!sQ+O%dQ+[%qQ+n%}Q,U&cQ,m&rW-^'a'i'j'mQ-e'eQ/l*bQ0]+]S1Y,V,YQ1q,lQ1r,oQ1s,pQ2X-]W2Z-`-a-d-fQ4Y0^Q4f0kQ4i0oQ4}1PQ5X1[Q5c1eU5r2Y2]2`Q5u2^Q6v4ZQ7O4hQ7P4jQ7V4sQ7`5OQ7f5WS7u5s5wQ7w5vQ8e6|Q8m7aQ8r7gQ8y7vQ9X8fQ9^8nQ9b8zR9j9_Q%qxQ'Y!hQ'e!sU+]%r%s%tQ,t&{U-X'Z'[']S-]'a'kQ/c*]S0^+^+_Q1y,vS2V-Y-ZQ2^-bQ3u/gQ4Z0_Q5n2PQ5q2WQ5v2_R6l3yS$vi;_R*m%QU%Pi%Q;_R/u*kQ$uiS(j#t+XQ(n#vS)Z$b$cQ*P$wQ*X$zQ*p%VQ*q%WQ*u%[Q.X:]Q.Y:_Q.Z:aQ.w)pS.|)v/OQ/Q)yQ/R){Q/S)|Q/[*TQ/a*ZQ/s*iQ/t*jh0T+U.S0{2m4z6O7[7{8k8}9]9eQ0o+pQ0q+sQ2p:hQ2q:jQ2r:lQ2s.^S3X:W:XQ3l/]Q3m/^Q3q/`Q4R/{Q4j0pQ4l0sQ6S:pQ6T:rQ6X:^Q6Y:`Q6Z:bQ6`3eQ6g3oQ6k3wQ6q3}Q6s4VQ6u4XQ8Q:mQ8R:iQ8S:kQ8[6fQ8`6oQ9P:qQ9Q:sQ9R8WQ9f:vQ9o:wQ;P;_Q;];gQ;^;hQ;i;kR;j;llpOXs!Y#b%e&h&j&k&m,a,f1f1iQ!ePS#dZ#mQ&r!_U'^!n4q7YQ't#QQ(w#zQ)h$lS,Y&a&dQ,_&eQ,l&qQ,q&yQ-T'WQ.e(uQ.u)iQ0P*{Q0W+VQ1b,^Q2T-VQ2k.TQ3`.pQ4P/yQ4x0|Q5Z1^Q5[1_Q5`1aQ5b1cQ5g1kQ5}2nQ6^3]Q7^4{Q7j5]Q7k5^Q7m5aQ7}6RQ8l7_R8v7n#UcOPXZs!Y!_!n#b#m#z%e&a&d&e&h&j&k&m&q&y'W(u*{+V,^,a,f-V.T/y0|1^1_1a1c1f1i1k2n4q4{5]5^5a6R7Y7_7nQ#WWQ#cYQ%itQ%juS%lv!fS'w#U'zQ'}#XQ(i#sQ(p#wQ(x#}Q(y$OQ(z$PQ({$QQ(|$RQ(}$SQ)O$TQ)P$UQ)Q$VQ)R$WQ)S$XQ)U$ZQ)X$`Q)]$dW)g$l)i.p3]Q+S%kQ+h%xS,w&}1zQ-f'hS-k'x-mQ-p(QQ-r(XQ.](mQ.c(qQ.g9pQ.i9sQ.j9tQ.k9wQ.z)tQ/|*wQ1u,rQ1x,uQ2Y-_Q2a-sQ2u.aQ2z9xQ2{9yQ2|9zQ2}9{Q3O9|Q3P9}Q3Q:OQ3R:PQ3S:QQ3T:RQ3U:SQ3V:TQ3W.hQ3Z:YQ3[:cQ3a:UQ4S0OQ4[0`Q5m:dQ5s2[Q5x2bQ6U2vQ6V:eQ6[:gQ6]:nQ7T4oQ7r5kQ7v5tQ8P:oQ8T:tQ8U:uQ8z7xQ9Y8gQ9a8xQ9r#QR;U;bR#YWR'P!dY!sQ'U-R0y4tS&{!d,yQ'a!qS'k!t!wS'm!x4vS,v&|'TS-b'b'cQ-d'dQ2P-PR2_-cR(o#vR(r#wQ!eQT-Q'U-R]!pQ!q'U-R0y4tQ#n]R'_9qT#iZ%]S#hZ%]S%cm,]U([#f#g#jS-v(](^Q-z(_Q0Q*|Q2d-wU2e-x-y-{S5z2f2gR7y5{`#[W#U#X%`'x(R*y-qr#eZm#f#g#j%](](^(_*|-w-x-y-{2f2g5{Q1`,]Q1v,sQ5i1nQ7q5jT:|&}*zT#_W%`S#^W%`S'y#U(RS(O#X*yS,x&}*zT-l'x-qT'S!d%aQ$jfR)n$oT)c$j)dR3_.oT*S$w*UR*[$zQ0U+UQ2i.SQ4w0{Q6P2mQ7]4zQ7|6OQ8i7[Q8{7{Q9[8kQ9d8}Q9i9]R9l9elqOXs!Y#b%e&h&j&k&m,a,f1f1iQ&b!UR,U&_rmOXs!T!U!Y#b%e&_&h&j&k&m,a,f1f1iR,]&eT%dm,]R0u+uR,T&]Q%{{R+m%|R+c%vT&f!V&iT&g!V&iT1h,f1i",
  nodeNames:
    '⚠ ArithOp ArithOp LineComment BlockComment Script ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > TypeParamList TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem',
  maxTerm: 366,
  context: trackNewline,
  nodeProps: [
    [
      'group',
      -26,
      6,
      14,
      16,
      62,
      199,
      203,
      207,
      208,
      210,
      213,
      216,
      226,
      228,
      234,
      236,
      238,
      240,
      243,
      249,
      255,
      257,
      259,
      261,
      263,
      265,
      266,
      'Statement',
      -32,
      10,
      11,
      25,
      28,
      29,
      35,
      45,
      48,
      49,
      51,
      56,
      64,
      72,
      76,
      78,
      80,
      81,
      103,
      104,
      113,
      114,
      131,
      134,
      136,
      137,
      138,
      139,
      141,
      142,
      162,
      163,
      165,
      'Expression',
      -23,
      24,
      26,
      30,
      34,
      36,
      38,
      166,
      168,
      170,
      171,
      173,
      174,
      175,
      177,
      178,
      179,
      181,
      182,
      183,
      193,
      195,
      197,
      198,
      'Type',
      -3,
      84,
      96,
      102,
      'ClassItem',
    ],
    [
      'openedBy',
      31,
      'InterpolationStart',
      50,
      '[',
      54,
      '{',
      69,
      '(',
      143,
      'JSXStartTag',
      155,
      'JSXStartTag JSXStartCloseTag',
    ],
    [
      'closedBy',
      33,
      'InterpolationEnd',
      44,
      ']',
      55,
      '}',
      70,
      ')',
      144,
      'JSXSelfCloseEndTag JSXEndTag',
      160,
      'JSXEndTag',
    ],
  ],
  propSources: [jsHighlight],
  skippedNodes: [0, 3, 4, 269],
  repeatNodeCount: 33,
  tokenData:
    "$>y(CSR!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tu>PuvBavwDxwxGgxyMvyz! Qz{!![{|!%O|}!&]}!O!%O!O!P!'g!P!Q!1w!Q!R#0t!R![#3T![!]#@T!]!^#Aa!^!_#Bk!_!`#GS!`!a#In!a!b#N{!b!c$$z!c!}>P!}#O$&U#O#P$'`#P#Q$,w#Q#R$.R#R#S>P#S#T$/`#T#o$0j#o#p$4z#p#q$5p#q#r$7Q#r#s$8^#s$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$I|>P$I|$I}$<s$I}$JO$<s$JO$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;'S>P;'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(n%d_$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$d&j'{!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU'{!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$d&j'xpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU'xpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z(CS+rq$d&j'xp'{!b'n(;dOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z(CS.ST'y#S$d&j'o(;dO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c(CS.n_$d&j'xp'{!b'o(;dOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`/x`$d&j!l$Ip'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S1V`#q$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S2d_#q$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$2b3l_'w$(n$d&j'{!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k*r4r_$d&j'{!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k)`5vX$d&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q)`6jT$_#t$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#t6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y#t7bO$_#t#t7eP;=`<%l6y)`7kP;=`<%l5q*r7w]$_#t$d&j'{!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}%W8uZ'{!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p%W9oU$_#t'{!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}%W:UP;=`<%l8p*r:[P;=`<%l4k#%|:hg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;'S<P;'S;=`=y<%lO<P#%|<[i$d&j(b!L^'xp'{!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!Q%Z!Q![<P![!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;'S<P;'S;=`=y<%lO<P#%|=|P;=`<%l<P(CS>`k$d&j'xp'{!b(V!LY'u&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;'S>P;'S;=`BZ<%lO>P+d@`k$d&j'xp'{!b$W#tOY%ZYZ&cZr%Zrs&}st%Ztu@Tuw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![@T![!^%Z!^!_*g!_!c%Z!c!}@T!}#O%Z#O#P&c#P#R%Z#R#S@T#S#T%Z#T#o@T#o#p*g#p$g%Z$g;'S@T;'S;=`BT<%lO@T+dBWP;=`<%l@T(CSB^P;=`<%l>P%#SBl`$d&j'xp'{!b#i$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SCy_$d&j#{$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%DfETa(k%<v$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sv%ZvwFYwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SFe`$d&j#u$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$2bGp_'z$)`$d&j'xpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;'SHo;'S;=`Mp<%lOHo*QHv_$d&j'xpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;'SHo;'S;=`Mp<%lOHo)`IzX$d&jOwIuwx6cx!^Iu!^!_Jg!_#oIu#o#pJg#p;'SIu;'S;=`KP<%lOIu#tJjTOwJgwx7]x;'SJg;'S;=`Jy<%lOJg#tJ|P;=`<%lJg)`KSP;=`<%lIu*QK`]$_#t$d&j'xpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r$fL^Z'xpOYLXYZJgZrLXrsJgswLXwxMPx#OLX#O#PJg#P;'SLX;'S;=`Mj<%lOLX$fMWU$_#t'xpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r$fMmP;=`<%lLX*QMsP;=`<%lHo(*QNR_!h(!b$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'l! ]_!gM|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h!!ib$d&j'xp'{!b'v#)d#j$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!#q{!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S!#|`$d&j'xp'{!b#g$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&-O!%Z`$d&j'xp'{!bk&%`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&C[!&h_!V&;l$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!'rc$d&j'xp'{!by'<nOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!(}!P!Q%Z!Q![!+g![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!)Wa$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!*]!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!*h_!UMt$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!+rg$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!+g![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S!+g#S#X%Z#X#Y!-Z#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!-dg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!.{|}%Z}!O!.{!O!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!/Uc$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!0lc$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!2Sf$d&j'xp'{!b#h$IdOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}xz!3hz{#$s{!P!3h!P!Q#&Y!Q!^!3h!^!_!Mh!_!`#-x!`!a#/_!a!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(r!3sb$d&j'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(Q!5U`$d&j'{!b!RSOY!4{YZ&cZw!4{wx!6Wx!P!4{!P!Q!=o!Q!^!4{!^!_!?g!_!}!4{!}#O!Bn#O#P!<w#P#o!4{#o#p!?g#p;'S!4{;'S;=`!Cw<%lO!4{&n!6_^$d&j!RSOY!6WYZ&cZ!P!6W!P!Q!7Z!Q!^!6W!^!_!8g!_!}!6W!}#O!;U#O#P!<w#P#o!6W#o#p!8g#p;'S!6W;'S;=`!=i<%lO!6W&n!7ba$d&j!RSO!^&c!_#Z&c#Z#[!7Z#[#]&c#]#^!7Z#^#a&c#a#b!7Z#b#g&c#g#h!7Z#h#i&c#i#j!7Z#j#m&c#m#n!7Z#n#o&c#p;'S&c;'S;=`&w<%lO&cS!8lX!RSOY!8gZ!P!8g!P!Q!9X!Q!}!8g!}#O!9p#O#P!:o#P;'S!8g;'S;=`!;O<%lO!8gS!9^U!RS#Z#[!9X#]#^!9X#a#b!9X#g#h!9X#i#j!9X#m#n!9XS!9sVOY!9pZ#O!9p#O#P!:Y#P#Q!8g#Q;'S!9p;'S;=`!:i<%lO!9pS!:]SOY!9pZ;'S!9p;'S;=`!:i<%lO!9pS!:lP;=`<%l!9pS!:rSOY!8gZ;'S!8g;'S;=`!;O<%lO!8gS!;RP;=`<%l!8g&n!;Z[$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#O!;U#O#P!<P#P#Q!6W#Q#o!;U#o#p!9p#p;'S!;U;'S;=`!<q<%lO!;U&n!<UX$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#o!;U#o#p!9p#p;'S!;U;'S;=`!<q<%lO!;U&n!<tP;=`<%l!;U&n!<|X$d&jOY!6WYZ&cZ!^!6W!^!_!8g!_#o!6W#o#p!8g#p;'S!6W;'S;=`!=i<%lO!6W&n!=lP;=`<%l!6W(Q!=xi$d&j'{!b!RSOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#Z&}#Z#[!=o#[#]&}#]#^!=o#^#a&}#a#b!=o#b#g&}#g#h!=o#h#i&}#i#j!=o#j#m&}#m#n!=o#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!f!?nZ'{!b!RSOY!?gZw!?gwx!8gx!P!?g!P!Q!@a!Q!}!?g!}#O!Ap#O#P!:o#P;'S!?g;'S;=`!Bh<%lO!?g!f!@hb'{!b!RSOY'}Zw'}x#O'}#P#Z'}#Z#[!@a#[#]'}#]#^!@a#^#a'}#a#b!@a#b#g'}#g#h!@a#h#i'}#i#j!@a#j#m'}#m#n!@a#n;'S'};'S;=`(f<%lO'}!f!AuX'{!bOY!ApZw!Apwx!9px#O!Ap#O#P!:Y#P#Q!?g#Q;'S!Ap;'S;=`!Bb<%lO!Ap!f!BeP;=`<%l!Ap!f!BkP;=`<%l!?g(Q!Bu^$d&j'{!bOY!BnYZ&cZw!Bnwx!;Ux!^!Bn!^!_!Ap!_#O!Bn#O#P!<P#P#Q!4{#Q#o!Bn#o#p!Ap#p;'S!Bn;'S;=`!Cq<%lO!Bn(Q!CtP;=`<%l!Bn(Q!CzP;=`<%l!4{'`!DW`$d&j'xp!RSOY!C}YZ&cZr!C}rs!6Ws!P!C}!P!Q!EY!Q!^!C}!^!_!GQ!_!}!C}!}#O!JX#O#P!<w#P#o!C}#o#p!GQ#p;'S!C};'S;=`!Kb<%lO!C}'`!Eci$d&j'xp!RSOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#Z(r#Z#[!EY#[#](r#]#^!EY#^#a(r#a#b!EY#b#g(r#g#h!EY#h#i(r#i#j!EY#j#m(r#m#n!EY#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rt!GXZ'xp!RSOY!GQZr!GQrs!8gs!P!GQ!P!Q!Gz!Q!}!GQ!}#O!IZ#O#P!:o#P;'S!GQ;'S;=`!JR<%lO!GQt!HRb'xp!RSOY)rZr)rs#O)r#P#Z)r#Z#[!Gz#[#])r#]#^!Gz#^#a)r#a#b!Gz#b#g)r#g#h!Gz#h#i)r#i#j!Gz#j#m)r#m#n!Gz#n;'S)r;'S;=`*Z<%lO)rt!I`X'xpOY!IZZr!IZrs!9ps#O!IZ#O#P!:Y#P#Q!GQ#Q;'S!IZ;'S;=`!I{<%lO!IZt!JOP;=`<%l!IZt!JUP;=`<%l!GQ'`!J`^$d&j'xpOY!JXYZ&cZr!JXrs!;Us!^!JX!^!_!IZ!_#O!JX#O#P!<P#P#Q!C}#Q#o!JX#o#p!IZ#p;'S!JX;'S;=`!K[<%lO!JX'`!K_P;=`<%l!JX'`!KeP;=`<%l!C}(r!Ksk$d&j'xp'{!b!RSOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#Z%Z#Z#[!Kh#[#]%Z#]#^!Kh#^#a%Z#a#b!Kh#b#g%Z#g#h!Kh#h#i%Z#i#j!Kh#j#m%Z#m#n!Kh#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#W!Mq]'xp'{!b!RSOY!MhZr!Mhrs!?gsw!Mhwx!GQx!P!Mh!P!Q!Nj!Q!}!Mh!}#O#!U#O#P!:o#P;'S!Mh;'S;=`##U<%lO!Mh#W!Nse'xp'{!b!RSOY*gZr*grs'}sw*gwx)rx#O*g#P#Z*g#Z#[!Nj#[#]*g#]#^!Nj#^#a*g#a#b!Nj#b#g*g#g#h!Nj#h#i*g#i#j!Nj#j#m*g#m#n!Nj#n;'S*g;'S;=`+Z<%lO*g#W#!]Z'xp'{!bOY#!UZr#!Urs!Apsw#!Uwx!IZx#O#!U#O#P!:Y#P#Q!Mh#Q;'S#!U;'S;=`##O<%lO#!U#W##RP;=`<%l#!U#W##XP;=`<%l!Mh(r##e`$d&j'xp'{!bOY##[YZ&cZr##[rs!Bnsw##[wx!JXx!^##[!^!_#!U!_#O##[#O#P!<P#P#Q!3h#Q#o##[#o#p#!U#p;'S##[;'S;=`#$g<%lO##[(r#$jP;=`<%l##[(r#$pP;=`<%l!3h(CS#%Qb$d&j'xp'{!b'p(;d!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(CS#&e_$d&j'xp'{!bR(;dOY#&YYZ&cZr#&Yrs#'dsw#&Ywx#*tx!^#&Y!^!_#,s!_#O#&Y#O#P#(f#P#o#&Y#o#p#,s#p;'S#&Y;'S;=`#-r<%lO#&Y(Bb#'m]$d&j'{!bR(;dOY#'dYZ&cZw#'dwx#(fx!^#'d!^!_#)w!_#O#'d#O#P#(f#P#o#'d#o#p#)w#p;'S#'d;'S;=`#*n<%lO#'d(AO#(mX$d&jR(;dOY#(fYZ&cZ!^#(f!^!_#)Y!_#o#(f#o#p#)Y#p;'S#(f;'S;=`#)q<%lO#(f(;d#)_SR(;dOY#)YZ;'S#)Y;'S;=`#)k<%lO#)Y(;d#)nP;=`<%l#)Y(AO#)tP;=`<%l#(f(<v#*OW'{!bR(;dOY#)wZw#)wwx#)Yx#O#)w#O#P#)Y#P;'S#)w;'S;=`#*h<%lO#)w(<v#*kP;=`<%l#)w(Bb#*qP;=`<%l#'d(Ap#*}]$d&j'xpR(;dOY#*tYZ&cZr#*trs#(fs!^#*t!^!_#+v!_#O#*t#O#P#(f#P#o#*t#o#p#+v#p;'S#*t;'S;=`#,m<%lO#*t(<U#+}W'xpR(;dOY#+vZr#+vrs#)Ys#O#+v#O#P#)Y#P;'S#+v;'S;=`#,g<%lO#+v(<U#,jP;=`<%l#+v(Ap#,pP;=`<%l#*t(=h#,|Y'xp'{!bR(;dOY#,sZr#,srs#)wsw#,swx#+vx#O#,s#O#P#)Y#P;'S#,s;'S;=`#-l<%lO#,s(=h#-oP;=`<%l#,s(CS#-uP;=`<%l#&Y%#W#.Vb$d&j#{$Id'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h+h#/lb$T#t$d&j'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h$/l#1Pp$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#U%Z#U#V#6_#V#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#d#9g#d#l%Z#l#m#<i#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#3`k$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#5`_$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#6hd$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#8Rf$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#9pc$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#;We$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#<rg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#>fi$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#@b_!a$b$d&j#y%<f'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Al_^l$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS#Bz^(O!*v!e'.r'xp'{!b$U)d(oSOY*gZr*grs'}sw*gwx)rx!P*g!P!Q#Cv!Q!^*g!^!_#Dl!_!`#F^!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#DPX$f&j'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#DuZ#k$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Eh!`#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#EqX#{$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#FgX#l$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Gh#G_a#X%?x$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a#Hd!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#W#Ho_#d$Ih$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#I}adBf#l$Id$a#|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`#KS!`!a#L^!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#K__#l$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#Lia#k$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`!a#Mn!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#My`#k$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h$ Wc(c$Ip$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P$!c!P!^%Z!^!_*g!_!a%Z!a!b$#m!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+`$!n_z'#p$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$#x`$d&j#v$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&^$%V_!x!Ln$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(@^$&a_|(8n$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$'eZ$d&jO!^$(W!^!_$(n!_#i$(W#i#j$(s#j#l$(W#l#m$*f#m#o$(W#o#p$(n#p;'S$(W;'S;=`$,q<%lO$(W(n$(_T[#S$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$(sO[#S(n$(x[$d&jO!Q&c!Q![$)n![!^&c!_!c&c!c!i$)n!i#T&c#T#Z$)n#Z#o&c#o#p$,U#p;'S&c;'S;=`&w<%lO&c(n$)sZ$d&jO!Q&c!Q![$*f![!^&c!_!c&c!c!i$*f!i#T&c#T#Z$*f#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$*kZ$d&jO!Q&c!Q![$+^![!^&c!_!c&c!c!i$+^!i#T&c#T#Z$+^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$+cZ$d&jO!Q&c!Q![$(W![!^&c!_!c&c!c!i$(W!i#T&c#T#Z$(W#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$,XR!Q![$,b!c!i$,b#T#Z$,b#S$,eS!Q![$,b!c!i$,b#T#Z$,b#q#r$(n(n$,tP;=`<%l$(W!2r$-S_!S!+S$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$.^`#s$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&,v$/k_$d&j'xp'{!b(S&%WOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$0yk$d&j'xp'{!b(V!LY'u&;d$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$0juw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$0j![!^%Z!^!_*g!_!c%Z!c!}$0j!}#O%Z#O#P&c#P#R%Z#R#S$0j#S#T%Z#T#o$0j#o#p*g#p$g%Z$g;'S$0j;'S;=`$4t<%lO$0j+d$2yk$d&j'xp'{!b$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$2nuw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$2n![!^%Z!^!_*g!_!c%Z!c!}$2n!}#O%Z#O#P&c#P#R%Z#R#S$2n#S#T%Z#T#o$2n#o#p*g#p$g%Z$g;'S$2n;'S;=`$4n<%lO$2n+d$4qP;=`<%l$2n(CS$4wP;=`<%l$0j!5p$5TX!X!3l'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Df$5{a(j%<v$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$#m#q;'S%Z;'S;=`+a<%lO%Z%#`$7__!W$I`o`$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(r$8i_!mS$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$9y|$d&j'xp'{!b'n(;d(V!LY'u&;d$W#tOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;'S>P;'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(CS$=Uk$d&j'xp'{!b'o(;d(V!LY'u&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;'S>P;'S;=`BZ<%lO>P",
  tokenizers: [
    noSemicolon,
    incdecToken,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    insertSemicolon,
    new LocalTokenGroup(
      "$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOq~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!O~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(U~~",
      141,
      327,
    ),
    new LocalTokenGroup("j~RQYZXz{^~^O'r~~aP!P!Qd~iO's~~", 25, 309),
  ],
  topRules: { Script: [0, 5], SingleExpression: [1, 267], SingleClassItem: [2, 268] },
  dialects: { jsx: 12794, ts: 12796 },
  dynamicPrecedences: { 76: 1, 78: 1, 163: 1, 191: 1 },
  specialized: [
    { term: 313, get: (value) => spec_identifier[value] || -1 },
    { term: 329, get: (value) => spec_word[value] || -1 },
    { term: 67, get: (value) => spec_LessThan[value] || -1 },
  ],
  tokenPrec: 12820,
});

// ../../node_modules/.pnpm/@codemirror+autocomplete@6.9.0_@codemirror+language@6.9.0_@codemirror+state@6.2.1_@codemirror_mbwpeaist2u73wwmrvyi6qduz4/node_modules/@codemirror/autocomplete/dist/index.js
var CompletionContext = class {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(state, pos, explicit) {
    this.state = state;
    this.pos = pos;
    this.explicit = explicit;
    this.abortListeners = [];
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(types) {
    let token = syntaxTree(this.state).resolveInner(this.pos, -1);
    while (token && types.indexOf(token.name) < 0) token = token.parent;
    return token
      ? {
          from: token.from,
          to: this.pos,
          text: this.state.sliceDoc(token.from, this.pos),
          type: token.type,
        }
      : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(expr) {
    let line = this.state.doc.lineAt(this.pos);
    let start = Math.max(line.from, this.pos - 250);
    let str = line.text.slice(start - line.from, this.pos - line.from);
    let found = str.search(ensureAnchor(expr, false));
    return found < 0 ? null : { from: start + found, to: this.pos, text: str.slice(found) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  */
  addEventListener(type, listener) {
    if (type == 'abort' && this.abortListeners) this.abortListeners.push(listener);
  }
};
function toSet(chars) {
  let flat = Object.keys(chars).join('');
  let words = /\w/.test(flat);
  if (words) flat = flat.replace(/\w/g, '');
  return `[${words ? '\\w' : ''}${flat.replace(/[^\w\s]/g, '\\$&')}]`;
}
function prefixMatch(options) {
  let first = /* @__PURE__ */ Object.create(null),
    rest = /* @__PURE__ */ Object.create(null);
  for (let { label } of options) {
    first[label[0]] = true;
    for (let i = 1; i < label.length; i++) rest[label[i]] = true;
  }
  let source = toSet(first) + toSet(rest) + '*$';
  return [new RegExp('^' + source), new RegExp(source)];
}
function completeFromList(list) {
  let options = list.map((o) => (typeof o == 'string' ? { label: o } : o));
  let [validFor, match] = options.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
  return (context) => {
    let token = context.matchBefore(match);
    return token || context.explicit ? { from: token ? token.from : context.pos, options, validFor } : null;
  };
}
function ifNotIn(nodes, source) {
  return (context) => {
    for (let pos = syntaxTree(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent) {
      if (nodes.indexOf(pos.name) > -1) return null;
      if (pos.type.isTop) break;
    }
    return source(context);
  };
}
var Option = class {
  constructor(completion, source, match, score2) {
    this.completion = completion;
    this.source = source;
    this.match = match;
    this.score = score2;
  }
};
function cur(state) {
  return state.selection.main.from;
}
function ensureAnchor(expr, start) {
  var _a;
  let { source } = expr;
  let addStart = start && source[0] != '^',
    addEnd = source[source.length - 1] != '$';
  if (!addStart && !addEnd) return expr;
  return new RegExp(
    `${addStart ? '^' : ''}(?:${source})${addEnd ? '$' : ''}`,
    (_a = expr.flags) !== null && _a !== void 0 ? _a : expr.ignoreCase ? 'i' : '',
  );
}
var pickedCompletion = Annotation.define();
function insertCompletionText(state, text, from, to) {
  let { main } = state.selection,
    fromOff = from - main.from,
    toOff = to - main.from;
  return Object.assign(
    Object.assign(
      {},
      state.changeByRange((range) => {
        if (
          range != main &&
          from != to &&
          state.sliceDoc(range.from + fromOff, range.from + toOff) != state.sliceDoc(from, to)
        )
          return { range };
        return {
          changes: { from: range.from + fromOff, to: to == main.from ? range.to : range.from + toOff, insert: text },
          range: EditorSelection.cursor(range.from + fromOff + text.length),
        };
      }),
    ),
    { userEvent: 'input.complete' },
  );
}
var SourceCache = /* @__PURE__ */ new WeakMap();
function asSource(source) {
  if (!Array.isArray(source)) return source;
  let known = SourceCache.get(source);
  if (!known) SourceCache.set(source, (known = completeFromList(source)));
  return known;
}
var startCompletionEffect = StateEffect.define();
var closeCompletionEffect = StateEffect.define();
var FuzzyMatcher = class {
  constructor(pattern) {
    this.pattern = pattern;
    this.chars = [];
    this.folded = [];
    this.any = [];
    this.precise = [];
    this.byWord = [];
    this.score = 0;
    this.matched = [];
    for (let p = 0; p < pattern.length; ) {
      let char = codePointAt(pattern, p),
        size = codePointSize(char);
      this.chars.push(char);
      let part = pattern.slice(p, p + size),
        upper = part.toUpperCase();
      this.folded.push(codePointAt(upper == part ? part.toLowerCase() : upper, 0));
      p += size;
    }
    this.astral = pattern.length != this.chars.length;
  }
  ret(score2, matched) {
    this.score = score2;
    this.matched = matched;
    return true;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(word) {
    if (this.pattern.length == 0) return this.ret(-100, []);
    if (word.length < this.pattern.length) return false;
    let { chars, folded, any, precise, byWord } = this;
    if (chars.length == 1) {
      let first = codePointAt(word, 0),
        firstSize = codePointSize(first);
      let score2 = firstSize == word.length ? 0 : -100;
      if (first == chars[0]);
      else if (first == folded[0]) score2 += -200;
      else return false;
      return this.ret(score2, [0, firstSize]);
    }
    let direct = word.indexOf(this.pattern);
    if (direct == 0) return this.ret(word.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let len = chars.length,
      anyTo = 0;
    if (direct < 0) {
      for (let i = 0, e = Math.min(word.length, 200); i < e && anyTo < len; ) {
        let next = codePointAt(word, i);
        if (next == chars[anyTo] || next == folded[anyTo]) any[anyTo++] = i;
        i += codePointSize(next);
      }
      if (anyTo < len) return false;
    }
    let preciseTo = 0;
    let byWordTo = 0,
      byWordFolded = false;
    let adjacentTo = 0,
      adjacentStart = -1,
      adjacentEnd = -1;
    let hasLower = /[a-z]/.test(word),
      wordAdjacent = true;
    for (let i = 0, e = Math.min(word.length, 200), prevType = 0; i < e && byWordTo < len; ) {
      let next = codePointAt(word, i);
      if (direct < 0) {
        if (preciseTo < len && next == chars[preciseTo]) precise[preciseTo++] = i;
        if (adjacentTo < len) {
          if (next == chars[adjacentTo] || next == folded[adjacentTo]) {
            if (adjacentTo == 0) adjacentStart = i;
            adjacentEnd = i + 1;
            adjacentTo++;
          } else {
            adjacentTo = 0;
          }
        }
      }
      let ch,
        type =
          next < 255
            ? (next >= 48 && next <= 57) || (next >= 97 && next <= 122)
              ? 2
              : next >= 65 && next <= 90
              ? 1
              : 0
            : (ch = fromCodePoint(next)) != ch.toLowerCase()
            ? 1
            : ch != ch.toUpperCase()
            ? 2
            : 0;
      if (!i || (type == 1 && hasLower) || (prevType == 0 && type != 0)) {
        if (chars[byWordTo] == next || (folded[byWordTo] == next && (byWordFolded = true))) byWord[byWordTo++] = i;
        else if (byWord.length) wordAdjacent = false;
      }
      prevType = type;
      i += codePointSize(next);
    }
    if (byWordTo == len && byWord[0] == 0 && wordAdjacent)
      return this.result(-100 + (byWordFolded ? -200 : 0), byWord, word);
    if (adjacentTo == len && adjacentStart == 0)
      return this.ret(-200 - word.length + (adjacentEnd == word.length ? 0 : -100), [0, adjacentEnd]);
    if (direct > -1) return this.ret(-700 - word.length, [direct, direct + this.pattern.length]);
    if (adjacentTo == len) return this.ret(-200 + -700 - word.length, [adjacentStart, adjacentEnd]);
    if (byWordTo == len)
      return this.result(-100 + (byWordFolded ? -200 : 0) + -700 + (wordAdjacent ? 0 : -1100), byWord, word);
    return chars.length == 2 ? false : this.result((any[0] ? -700 : 0) + -200 + -1100, any, word);
  }
  result(score2, positions, word) {
    let result = [],
      i = 0;
    for (let pos of positions) {
      let to = pos + (this.astral ? codePointSize(codePointAt(word, pos)) : 1);
      if (i && result[i - 1] == pos) result[i - 1] = to;
      else {
        result[i++] = pos;
        result[i++] = to;
      }
    }
    return this.ret(score2 - word.length, result);
  }
};
var completionConfig = Facet.define({
  combine(configs) {
    return combineConfig(
      configs,
      {
        activateOnTyping: true,
        selectOnOpen: true,
        override: null,
        closeOnBlur: true,
        maxRenderedOptions: 100,
        defaultKeymap: true,
        tooltipClass: () => '',
        optionClass: () => '',
        aboveCursor: false,
        icons: true,
        addToOptions: [],
        positionInfo: defaultPositionInfo,
        compareCompletions: (a, b) => a.label.localeCompare(b.label),
        interactionDelay: 75,
      },
      {
        defaultKeymap: (a, b) => a && b,
        closeOnBlur: (a, b) => a && b,
        icons: (a, b) => a && b,
        tooltipClass: (a, b) => (c) => joinClass(a(c), b(c)),
        optionClass: (a, b) => (c) => joinClass(a(c), b(c)),
        addToOptions: (a, b) => a.concat(b),
      },
    );
  },
});
function joinClass(a, b) {
  return a ? (b ? a + ' ' + b : a) : b;
}
function defaultPositionInfo(view, list, option, info, space2) {
  let rtl = view.textDirection == Direction.RTL,
    left = rtl,
    narrow = false;
  let side = 'top',
    offset,
    maxWidth;
  let spaceLeft = list.left - space2.left,
    spaceRight = space2.right - list.right;
  let infoWidth = info.right - info.left,
    infoHeight = info.bottom - info.top;
  if (left && spaceLeft < Math.min(infoWidth, spaceRight)) left = false;
  else if (!left && spaceRight < Math.min(infoWidth, spaceLeft)) left = true;
  if (infoWidth <= (left ? spaceLeft : spaceRight)) {
    offset = Math.max(space2.top, Math.min(option.top, space2.bottom - infoHeight)) - list.top;
    maxWidth = Math.min(400, left ? spaceLeft : spaceRight);
  } else {
    narrow = true;
    maxWidth = Math.min(
      400,
      (rtl ? list.right : space2.right - list.left) - 30,
      /* Margin */
    );
    let spaceBelow = space2.bottom - list.bottom;
    if (spaceBelow >= infoHeight || spaceBelow > list.top) {
      offset = option.bottom - list.top;
    } else {
      side = 'bottom';
      offset = list.bottom - option.top;
    }
  }
  return {
    style: `${side}: ${offset}px; max-width: ${maxWidth}px`,
    class: 'cm-completionInfo-' + (narrow ? (rtl ? 'left-narrow' : 'right-narrow') : left ? 'left' : 'right'),
  };
}
function optionContent(config2) {
  let content = config2.addToOptions.slice();
  if (config2.icons)
    content.push({
      render(completion) {
        let icon = document.createElement('div');
        icon.classList.add('cm-completionIcon');
        if (completion.type)
          icon.classList.add(...completion.type.split(/\s+/g).map((cls) => 'cm-completionIcon-' + cls));
        icon.setAttribute('aria-hidden', 'true');
        return icon;
      },
      position: 20,
    });
  content.push(
    {
      render(completion, _s, match) {
        let labelElt = document.createElement('span');
        labelElt.className = 'cm-completionLabel';
        let label = completion.displayLabel || completion.label,
          off = 0;
        for (let j = 0; j < match.length; ) {
          let from = match[j++],
            to = match[j++];
          if (from > off) labelElt.appendChild(document.createTextNode(label.slice(off, from)));
          let span = labelElt.appendChild(document.createElement('span'));
          span.appendChild(document.createTextNode(label.slice(from, to)));
          span.className = 'cm-completionMatchedText';
          off = to;
        }
        if (off < label.length) labelElt.appendChild(document.createTextNode(label.slice(off)));
        return labelElt;
      },
      position: 50,
    },
    {
      render(completion) {
        if (!completion.detail) return null;
        let detailElt = document.createElement('span');
        detailElt.className = 'cm-completionDetail';
        detailElt.textContent = completion.detail;
        return detailElt;
      },
      position: 80,
    },
  );
  return content.sort((a, b) => a.position - b.position).map((a) => a.render);
}
function rangeAroundSelected(total, selected, max) {
  if (total <= max) return { from: 0, to: total };
  if (selected < 0) selected = 0;
  if (selected <= total >> 1) {
    let off2 = Math.floor(selected / max);
    return { from: off2 * max, to: (off2 + 1) * max };
  }
  let off = Math.floor((total - selected) / max);
  return { from: total - (off + 1) * max, to: total - off * max };
}
var CompletionTooltip = class {
  constructor(view, stateField, applyCompletion2) {
    this.view = view;
    this.stateField = stateField;
    this.applyCompletion = applyCompletion2;
    this.info = null;
    this.infoDestroy = null;
    this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (pos) => this.placeInfo(pos),
      key: this,
    };
    this.space = null;
    this.currentClass = '';
    let cState = view.state.field(stateField);
    let { options, selected } = cState.open;
    let config2 = view.state.facet(completionConfig);
    this.optionContent = optionContent(config2);
    this.optionClass = config2.optionClass;
    this.tooltipClass = config2.tooltipClass;
    this.range = rangeAroundSelected(options.length, selected, config2.maxRenderedOptions);
    this.dom = document.createElement('div');
    this.dom.className = 'cm-tooltip-autocomplete';
    this.updateTooltipClass(view.state);
    this.dom.addEventListener('mousedown', (e) => {
      for (let dom = e.target, match; dom && dom != this.dom; dom = dom.parentNode) {
        if (dom.nodeName == 'LI' && (match = /-(\d+)$/.exec(dom.id)) && +match[1] < options.length) {
          this.applyCompletion(view, options[+match[1]]);
          e.preventDefault();
          return;
        }
      }
    });
    this.dom.addEventListener('focusout', (e) => {
      let state = view.state.field(this.stateField, false);
      if (
        state &&
        state.tooltip &&
        view.state.facet(completionConfig).closeOnBlur &&
        e.relatedTarget != view.contentDOM
      )
        view.dispatch({ effects: closeCompletionEffect.of(null) });
    });
    this.list = this.dom.appendChild(this.createListBox(options, cState.id, this.range));
    this.list.addEventListener('scroll', () => {
      if (this.info) this.view.requestMeasure(this.placeInfoReq);
    });
  }
  mount() {
    this.updateSel();
  }
  update(update) {
    var _a, _b, _c;
    let cState = update.state.field(this.stateField);
    let prevState = update.startState.field(this.stateField);
    this.updateTooltipClass(update.state);
    if (cState != prevState) {
      this.updateSel();
      if (
        ((_a = cState.open) === null || _a === void 0 ? void 0 : _a.disabled) !=
        ((_b = prevState.open) === null || _b === void 0 ? void 0 : _b.disabled)
      )
        this.dom.classList.toggle(
          'cm-tooltip-autocomplete-disabled',
          !!((_c = cState.open) === null || _c === void 0 ? void 0 : _c.disabled),
        );
    }
  }
  updateTooltipClass(state) {
    let cls = this.tooltipClass(state);
    if (cls != this.currentClass) {
      for (let c of this.currentClass.split(' ')) if (c) this.dom.classList.remove(c);
      for (let c of cls.split(' ')) if (c) this.dom.classList.add(c);
      this.currentClass = cls;
    }
  }
  positioned(space2) {
    this.space = space2;
    if (this.info) this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let cState = this.view.state.field(this.stateField),
      open = cState.open;
    if ((open.selected > -1 && open.selected < this.range.from) || open.selected >= this.range.to) {
      this.range = rangeAroundSelected(
        open.options.length,
        open.selected,
        this.view.state.facet(completionConfig).maxRenderedOptions,
      );
      this.list.remove();
      this.list = this.dom.appendChild(this.createListBox(open.options, cState.id, this.range));
      this.list.addEventListener('scroll', () => {
        if (this.info) this.view.requestMeasure(this.placeInfoReq);
      });
    }
    if (this.updateSelectedOption(open.selected)) {
      this.destroyInfo();
      let { completion } = open.options[open.selected];
      let { info } = completion;
      if (!info) return;
      let infoResult = typeof info === 'string' ? document.createTextNode(info) : info(completion);
      if (!infoResult) return;
      if ('then' in infoResult) {
        infoResult
          .then((obj) => {
            if (obj && this.view.state.field(this.stateField, false) == cState) this.addInfoPane(obj, completion);
          })
          .catch((e) => logException(this.view.state, e, 'completion info'));
      } else {
        this.addInfoPane(infoResult, completion);
      }
    }
  }
  addInfoPane(content, completion) {
    this.destroyInfo();
    let wrap = (this.info = document.createElement('div'));
    wrap.className = 'cm-tooltip cm-completionInfo';
    if (content.nodeType != null) {
      wrap.appendChild(content);
      this.infoDestroy = null;
    } else {
      let { dom, destroy } = content;
      wrap.appendChild(dom);
      this.infoDestroy = destroy || null;
    }
    this.dom.appendChild(wrap);
    this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(selected) {
    let set = null;
    for (let opt = this.list.firstChild, i = this.range.from; opt; opt = opt.nextSibling, i++) {
      if (opt.nodeName != 'LI' || !opt.id) {
        i--;
      } else if (i == selected) {
        if (!opt.hasAttribute('aria-selected')) {
          opt.setAttribute('aria-selected', 'true');
          set = opt;
        }
      } else {
        if (opt.hasAttribute('aria-selected')) opt.removeAttribute('aria-selected');
      }
    }
    if (set) scrollIntoView(this.list, set);
    return set;
  }
  measureInfo() {
    let sel = this.dom.querySelector('[aria-selected]');
    if (!sel || !this.info) return null;
    let listRect = this.dom.getBoundingClientRect();
    let infoRect = this.info.getBoundingClientRect();
    let selRect = sel.getBoundingClientRect();
    let space2 = this.space;
    if (!space2) {
      let win = this.dom.ownerDocument.defaultView || window;
      space2 = { left: 0, top: 0, right: win.innerWidth, bottom: win.innerHeight };
    }
    if (
      selRect.top > Math.min(space2.bottom, listRect.bottom) - 10 ||
      selRect.bottom < Math.max(space2.top, listRect.top) + 10
    )
      return null;
    return this.view.state.facet(completionConfig).positionInfo(this.view, listRect, selRect, infoRect, space2);
  }
  placeInfo(pos) {
    if (this.info) {
      if (pos) {
        if (pos.style) this.info.style.cssText = pos.style;
        this.info.className = 'cm-tooltip cm-completionInfo ' + (pos.class || '');
      } else {
        this.info.style.cssText = 'top: -1e6px';
      }
    }
  }
  createListBox(options, id, range) {
    const ul = document.createElement('ul');
    ul.id = id;
    ul.setAttribute('role', 'listbox');
    ul.setAttribute('aria-expanded', 'true');
    ul.setAttribute('aria-label', this.view.state.phrase('Completions'));
    let curSection = null;
    for (let i = range.from; i < range.to; i++) {
      let { completion, match } = options[i],
        { section } = completion;
      if (section) {
        let name = typeof section == 'string' ? section : section.name;
        if (name != curSection && (i > range.from || range.from == 0)) {
          curSection = name;
          if (typeof section != 'string' && section.header) {
            ul.appendChild(section.header(section));
          } else {
            let header = ul.appendChild(document.createElement('completion-section'));
            header.textContent = name;
          }
        }
      }
      const li = ul.appendChild(document.createElement('li'));
      li.id = id + '-' + i;
      li.setAttribute('role', 'option');
      let cls = this.optionClass(completion);
      if (cls) li.className = cls;
      for (let source of this.optionContent) {
        let node = source(completion, this.view.state, match);
        if (node) li.appendChild(node);
      }
    }
    if (range.from) ul.classList.add('cm-completionListIncompleteTop');
    if (range.to < options.length) ul.classList.add('cm-completionListIncompleteBottom');
    return ul;
  }
  destroyInfo() {
    if (this.info) {
      if (this.infoDestroy) this.infoDestroy();
      this.info.remove();
      this.info = null;
    }
  }
  destroy() {
    this.destroyInfo();
  }
};
function completionTooltip(stateField, applyCompletion2) {
  return (view) => new CompletionTooltip(view, stateField, applyCompletion2);
}
function scrollIntoView(container, element) {
  let parent = container.getBoundingClientRect();
  let self = element.getBoundingClientRect();
  if (self.top < parent.top) container.scrollTop -= parent.top - self.top;
  else if (self.bottom > parent.bottom) container.scrollTop += self.bottom - parent.bottom;
}
function score(option) {
  return (option.boost || 0) * 100 + (option.apply ? 10 : 0) + (option.info ? 5 : 0) + (option.type ? 1 : 0);
}
function sortOptions(active, state) {
  let options = [];
  let sections = null;
  let addOption = (option) => {
    options.push(option);
    let { section } = option.completion;
    if (section) {
      if (!sections) sections = [];
      let name = typeof section == 'string' ? section : section.name;
      if (!sections.some((s) => s.name == name)) sections.push(typeof section == 'string' ? { name } : section);
    }
  };
  for (let a of active)
    if (a.hasResult()) {
      let getMatch = a.result.getMatch;
      if (a.result.filter === false) {
        for (let option of a.result.options) {
          addOption(new Option(option, a.source, getMatch ? getMatch(option) : [], 1e9 - options.length));
        }
      } else {
        let matcher = new FuzzyMatcher(state.sliceDoc(a.from, a.to));
        for (let option of a.result.options)
          if (matcher.match(option.label)) {
            let matched = !option.displayLabel ? matcher.matched : getMatch ? getMatch(option, matcher.matched) : [];
            addOption(new Option(option, a.source, matched, matcher.score + (option.boost || 0)));
          }
      }
    }
  if (sections) {
    let sectionOrder = /* @__PURE__ */ Object.create(null),
      pos = 0;
    let cmp = (a, b) => {
      var _a, _b;
      return (
        ((_a = a.rank) !== null && _a !== void 0 ? _a : 1e9) - ((_b = b.rank) !== null && _b !== void 0 ? _b : 1e9) ||
        (a.name < b.name ? -1 : 1)
      );
    };
    for (let s of sections.sort(cmp)) {
      pos -= 1e5;
      sectionOrder[s.name] = pos;
    }
    for (let option of options) {
      let { section } = option.completion;
      if (section) option.score += sectionOrder[typeof section == 'string' ? section : section.name];
    }
  }
  let result = [],
    prev = null;
  let compare = state.facet(completionConfig).compareCompletions;
  for (let opt of options.sort((a, b) => b.score - a.score || compare(a.completion, b.completion))) {
    let cur2 = opt.completion;
    if (
      !prev ||
      prev.label != cur2.label ||
      prev.detail != cur2.detail ||
      (prev.type != null && cur2.type != null && prev.type != cur2.type) ||
      prev.apply != cur2.apply ||
      prev.boost != cur2.boost
    )
      result.push(opt);
    else if (score(opt.completion) > score(prev)) result[result.length - 1] = opt;
    prev = opt.completion;
  }
  return result;
}
var CompletionDialog = class _CompletionDialog {
  constructor(options, attrs, tooltip, timestamp, selected, disabled) {
    this.options = options;
    this.attrs = attrs;
    this.tooltip = tooltip;
    this.timestamp = timestamp;
    this.selected = selected;
    this.disabled = disabled;
  }
  setSelected(selected, id) {
    return selected == this.selected || selected >= this.options.length
      ? this
      : new _CompletionDialog(
          this.options,
          makeAttrs(id, selected),
          this.tooltip,
          this.timestamp,
          selected,
          this.disabled,
        );
  }
  static build(active, state, id, prev, conf) {
    let options = sortOptions(active, state);
    if (!options.length) {
      return prev &&
        active.some(
          (a) => a.state == 1,
          /* Pending */
        )
        ? new _CompletionDialog(prev.options, prev.attrs, prev.tooltip, prev.timestamp, prev.selected, true)
        : null;
    }
    let selected = state.facet(completionConfig).selectOnOpen ? 0 : -1;
    if (prev && prev.selected != selected && prev.selected != -1) {
      let selectedValue = prev.options[prev.selected].completion;
      for (let i = 0; i < options.length; i++)
        if (options[i].completion == selectedValue) {
          selected = i;
          break;
        }
    }
    return new _CompletionDialog(
      options,
      makeAttrs(id, selected),
      {
        pos: active.reduce((a, b) => (b.hasResult() ? Math.min(a, b.from) : a), 1e8),
        create: completionTooltip(completionState, applyCompletion),
        above: conf.aboveCursor,
      },
      prev ? prev.timestamp : Date.now(),
      selected,
      false,
    );
  }
  map(changes) {
    return new _CompletionDialog(
      this.options,
      this.attrs,
      Object.assign(Object.assign({}, this.tooltip), { pos: changes.mapPos(this.tooltip.pos) }),
      this.timestamp,
      this.selected,
      this.disabled,
    );
  }
};
var CompletionState = class _CompletionState {
  constructor(active, id, open) {
    this.active = active;
    this.id = id;
    this.open = open;
  }
  static start() {
    return new _CompletionState(none, 'cm-ac-' + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(tr) {
    let { state } = tr,
      conf = state.facet(completionConfig);
    let sources = conf.override || state.languageDataAt('autocomplete', cur(state)).map(asSource);
    let active = sources.map((source) => {
      let value =
        this.active.find((s) => s.source == source) ||
        new ActiveSource(
          source,
          this.active.some(
            (a) => a.state != 0,
            /* Inactive */
          )
            ? 1
            : 0,
          /* Inactive */
        );
      return value.update(tr, conf);
    });
    if (active.length == this.active.length && active.every((a, i) => a == this.active[i])) active = this.active;
    let open = this.open;
    if (open && tr.docChanged) open = open.map(tr.changes);
    if (
      tr.selection ||
      active.some((a) => a.hasResult() && tr.changes.touchesRange(a.from, a.to)) ||
      !sameResults(active, this.active)
    )
      open = CompletionDialog.build(active, state, this.id, open, conf);
    else if (
      open &&
      open.disabled &&
      !active.some(
        (a) => a.state == 1,
        /* Pending */
      )
    )
      open = null;
    if (
      !open &&
      active.every(
        (a) => a.state != 1,
        /* Pending */
      ) &&
      active.some((a) => a.hasResult())
    )
      active = active.map((a) =>
        a.hasResult()
          ? new ActiveSource(
              a.source,
              0,
              /* Inactive */
            )
          : a,
      );
    for (let effect of tr.effects)
      if (effect.is(setSelectedEffect)) open = open && open.setSelected(effect.value, this.id);
    return active == this.active && open == this.open ? this : new _CompletionState(active, this.id, open);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : baseAttrs;
  }
};
function sameResults(a, b) {
  if (a == b) return true;
  for (let iA = 0, iB = 0; ; ) {
    while (iA < a.length && !a[iA].hasResult) iA++;
    while (iB < b.length && !b[iB].hasResult) iB++;
    let endA = iA == a.length,
      endB = iB == b.length;
    if (endA || endB) return endA == endB;
    if (a[iA++].result != b[iB++].result) return false;
  }
}
var baseAttrs = {
  'aria-autocomplete': 'list',
};
function makeAttrs(id, selected) {
  let result = {
    'aria-autocomplete': 'list',
    'aria-haspopup': 'listbox',
    'aria-controls': id,
  };
  if (selected > -1) result['aria-activedescendant'] = id + '-' + selected;
  return result;
}
var none = [];
function getUserEvent(tr) {
  return tr.isUserEvent('input.type') ? 'input' : tr.isUserEvent('delete.backward') ? 'delete' : null;
}
var ActiveSource = class _ActiveSource {
  constructor(source, state, explicitPos = -1) {
    this.source = source;
    this.state = state;
    this.explicitPos = explicitPos;
  }
  hasResult() {
    return false;
  }
  update(tr, conf) {
    let event = getUserEvent(tr),
      value = this;
    if (event) value = value.handleUserEvent(tr, event, conf);
    else if (tr.docChanged) value = value.handleChange(tr);
    else if (tr.selection && value.state != 0)
      value = new _ActiveSource(
        value.source,
        0,
        /* Inactive */
      );
    for (let effect of tr.effects) {
      if (effect.is(startCompletionEffect))
        value = new _ActiveSource(value.source, 1, effect.value ? cur(tr.state) : -1);
      else if (effect.is(closeCompletionEffect))
        value = new _ActiveSource(
          value.source,
          0,
          /* Inactive */
        );
      else if (effect.is(setActiveEffect)) {
        for (let active of effect.value) if (active.source == value.source) value = active;
      }
    }
    return value;
  }
  handleUserEvent(tr, type, conf) {
    return type == 'delete' || !conf.activateOnTyping
      ? this.map(tr.changes)
      : new _ActiveSource(
          this.source,
          1,
          /* Pending */
        );
  }
  handleChange(tr) {
    return tr.changes.touchesRange(cur(tr.startState))
      ? new _ActiveSource(
          this.source,
          0,
          /* Inactive */
        )
      : this.map(tr.changes);
  }
  map(changes) {
    return changes.empty || this.explicitPos < 0
      ? this
      : new _ActiveSource(this.source, this.state, changes.mapPos(this.explicitPos));
  }
};
var ActiveResult = class _ActiveResult extends ActiveSource {
  constructor(source, explicitPos, result, from, to) {
    super(source, 2, explicitPos);
    this.result = result;
    this.from = from;
    this.to = to;
  }
  hasResult() {
    return true;
  }
  handleUserEvent(tr, type, conf) {
    var _a;
    let from = tr.changes.mapPos(this.from),
      to = tr.changes.mapPos(this.to, 1);
    let pos = cur(tr.state);
    if (
      (this.explicitPos < 0 ? pos <= from : pos < this.from) ||
      pos > to ||
      (type == 'delete' && cur(tr.startState) == this.from)
    )
      return new ActiveSource(
        this.source,
        type == 'input' && conf.activateOnTyping ? 1 : 0,
        /* Inactive */
      );
    let explicitPos = this.explicitPos < 0 ? -1 : tr.changes.mapPos(this.explicitPos),
      updated;
    if (checkValid(this.result.validFor, tr.state, from, to))
      return new _ActiveResult(this.source, explicitPos, this.result, from, to);
    if (
      this.result.update &&
      (updated = this.result.update(this.result, from, to, new CompletionContext(tr.state, pos, explicitPos >= 0)))
    )
      return new _ActiveResult(
        this.source,
        explicitPos,
        updated,
        updated.from,
        (_a = updated.to) !== null && _a !== void 0 ? _a : cur(tr.state),
      );
    return new ActiveSource(this.source, 1, explicitPos);
  }
  handleChange(tr) {
    return tr.changes.touchesRange(this.from, this.to)
      ? new ActiveSource(
          this.source,
          0,
          /* Inactive */
        )
      : this.map(tr.changes);
  }
  map(mapping) {
    return mapping.empty
      ? this
      : new _ActiveResult(
          this.source,
          this.explicitPos < 0 ? -1 : mapping.mapPos(this.explicitPos),
          this.result,
          mapping.mapPos(this.from),
          mapping.mapPos(this.to, 1),
        );
  }
};
function checkValid(validFor, state, from, to) {
  if (!validFor) return false;
  let text = state.sliceDoc(from, to);
  return typeof validFor == 'function' ? validFor(text, from, to, state) : ensureAnchor(validFor, true).test(text);
}
var setActiveEffect = StateEffect.define({
  map(sources, mapping) {
    return sources.map((s) => s.map(mapping));
  },
});
var setSelectedEffect = StateEffect.define();
var completionState = StateField.define({
  create() {
    return CompletionState.start();
  },
  update(value, tr) {
    return value.update(tr);
  },
  provide: (f) => [
    showTooltip.from(f, (val) => val.tooltip),
    EditorView.contentAttributes.from(f, (state) => state.attrs),
  ],
});
function applyCompletion(view, option) {
  const apply = option.completion.apply || option.completion.label;
  let result = view.state.field(completionState).active.find((a) => a.source == option.source);
  if (!(result instanceof ActiveResult)) return false;
  if (typeof apply == 'string')
    view.dispatch(
      Object.assign(Object.assign({}, insertCompletionText(view.state, apply, result.from, result.to)), {
        annotations: pickedCompletion.of(option.completion),
      }),
    );
  else apply(view, option.completion, result.from, result.to);
  return true;
}
function moveCompletionSelection(forward, by = 'option') {
  return (view) => {
    let cState = view.state.field(completionState, false);
    if (
      !cState ||
      !cState.open ||
      cState.open.disabled ||
      Date.now() - cState.open.timestamp < view.state.facet(completionConfig).interactionDelay
    )
      return false;
    let step = 1,
      tooltip;
    if (by == 'page' && (tooltip = getTooltip(view, cState.open.tooltip)))
      step = Math.max(2, Math.floor(tooltip.dom.offsetHeight / tooltip.dom.querySelector('li').offsetHeight) - 1);
    let { length } = cState.open.options;
    let selected =
      cState.open.selected > -1 ? cState.open.selected + step * (forward ? 1 : -1) : forward ? 0 : length - 1;
    if (selected < 0) selected = by == 'page' ? 0 : length - 1;
    else if (selected >= length) selected = by == 'page' ? length - 1 : 0;
    view.dispatch({ effects: setSelectedEffect.of(selected) });
    return true;
  };
}
var acceptCompletion = (view) => {
  let cState = view.state.field(completionState, false);
  if (
    view.state.readOnly ||
    !cState ||
    !cState.open ||
    cState.open.selected < 0 ||
    cState.open.disabled ||
    Date.now() - cState.open.timestamp < view.state.facet(completionConfig).interactionDelay
  )
    return false;
  return applyCompletion(view, cState.open.options[cState.open.selected]);
};
var startCompletion = (view) => {
  let cState = view.state.field(completionState, false);
  if (!cState) return false;
  view.dispatch({ effects: startCompletionEffect.of(true) });
  return true;
};
var closeCompletion = (view) => {
  let cState = view.state.field(completionState, false);
  if (
    !cState ||
    !cState.active.some(
      (a) => a.state != 0,
      /* Inactive */
    )
  )
    return false;
  view.dispatch({ effects: closeCompletionEffect.of(null) });
  return true;
};
var RunningQuery = class {
  constructor(active, context) {
    this.active = active;
    this.context = context;
    this.time = Date.now();
    this.updates = [];
    this.done = void 0;
  }
};
var DebounceTime = 50;
var MaxUpdateCount = 50;
var MinAbortTime = 1e3;
var completionPlugin = ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.view = view;
      this.debounceUpdate = -1;
      this.running = [];
      this.debounceAccept = -1;
      this.composing = 0;
      for (let active of view.state.field(completionState).active) if (active.state == 1) this.startQuery(active);
    }
    update(update) {
      let cState = update.state.field(completionState);
      if (!update.selectionSet && !update.docChanged && update.startState.field(completionState) == cState) return;
      let doesReset = update.transactions.some((tr) => {
        return (tr.selection || tr.docChanged) && !getUserEvent(tr);
      });
      for (let i = 0; i < this.running.length; i++) {
        let query = this.running[i];
        if (
          doesReset ||
          (query.updates.length + update.transactions.length > MaxUpdateCount && Date.now() - query.time > MinAbortTime)
        ) {
          for (let handler of query.context.abortListeners) {
            try {
              handler();
            } catch (e) {
              logException(this.view.state, e);
            }
          }
          query.context.abortListeners = null;
          this.running.splice(i--, 1);
        } else {
          query.updates.push(...update.transactions);
        }
      }
      if (this.debounceUpdate > -1) clearTimeout(this.debounceUpdate);
      this.debounceUpdate = cState.active.some(
        (a) => a.state == 1 && !this.running.some((q) => q.active.source == a.source),
      )
        ? setTimeout(() => this.startUpdate(), DebounceTime)
        : -1;
      if (this.composing != 0)
        for (let tr of update.transactions) {
          if (getUserEvent(tr) == 'input') this.composing = 2;
          else if (this.composing == 2 && tr.selection) this.composing = 3;
        }
    }
    startUpdate() {
      this.debounceUpdate = -1;
      let { state } = this.view,
        cState = state.field(completionState);
      for (let active of cState.active) {
        if (active.state == 1 && !this.running.some((r) => r.active.source == active.source)) this.startQuery(active);
      }
    }
    startQuery(active) {
      let { state } = this.view,
        pos = cur(state);
      let context = new CompletionContext(state, pos, active.explicitPos == pos);
      let pending = new RunningQuery(active, context);
      this.running.push(pending);
      Promise.resolve(active.source(context)).then(
        (result) => {
          if (!pending.context.aborted) {
            pending.done = result || null;
            this.scheduleAccept();
          }
        },
        (err) => {
          this.view.dispatch({ effects: closeCompletionEffect.of(null) });
          logException(this.view.state, err);
        },
      );
    }
    scheduleAccept() {
      if (this.running.every((q) => q.done !== void 0)) this.accept();
      else if (this.debounceAccept < 0) this.debounceAccept = setTimeout(() => this.accept(), DebounceTime);
    }
    // For each finished query in this.running, try to create a result
    // or, if appropriate, restart the query.
    accept() {
      var _a;
      if (this.debounceAccept > -1) clearTimeout(this.debounceAccept);
      this.debounceAccept = -1;
      let updated = [];
      let conf = this.view.state.facet(completionConfig);
      for (let i = 0; i < this.running.length; i++) {
        let query = this.running[i];
        if (query.done === void 0) continue;
        this.running.splice(i--, 1);
        if (query.done) {
          let active = new ActiveResult(
            query.active.source,
            query.active.explicitPos,
            query.done,
            query.done.from,
            (_a = query.done.to) !== null && _a !== void 0
              ? _a
              : cur(query.updates.length ? query.updates[0].startState : this.view.state),
          );
          for (let tr of query.updates) active = active.update(tr, conf);
          if (active.hasResult()) {
            updated.push(active);
            continue;
          }
        }
        let current = this.view.state.field(completionState).active.find((a) => a.source == query.active.source);
        if (current && current.state == 1) {
          if (query.done == null) {
            let active = new ActiveSource(
              query.active.source,
              0,
              /* Inactive */
            );
            for (let tr of query.updates) active = active.update(tr, conf);
            if (active.state != 1) updated.push(active);
          } else {
            this.startQuery(current);
          }
        }
      }
      if (updated.length) this.view.dispatch({ effects: setActiveEffect.of(updated) });
    }
  },
  {
    eventHandlers: {
      blur(event) {
        let state = this.view.state.field(completionState, false);
        if (state && state.tooltip && this.view.state.facet(completionConfig).closeOnBlur) {
          let dialog = state.open && getTooltip(this.view, state.open.tooltip);
          if (!dialog || !dialog.dom.contains(event.relatedTarget))
            this.view.dispatch({ effects: closeCompletionEffect.of(null) });
        }
      },
      compositionstart() {
        this.composing = 1;
      },
      compositionend() {
        if (this.composing == 3) {
          setTimeout(() => this.view.dispatch({ effects: startCompletionEffect.of(false) }), 20);
        }
        this.composing = 0;
      },
    },
  },
);
var baseTheme = EditorView.baseTheme({
  '.cm-tooltip.cm-tooltip-autocomplete': {
    '& > ul': {
      fontFamily: 'monospace',
      whiteSpace: 'nowrap',
      overflow: 'hidden auto',
      maxWidth_fallback: '700px',
      maxWidth: 'min(700px, 95vw)',
      minWidth: '250px',
      maxHeight: '10em',
      height: '100%',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      '& > li, & > completion-section': {
        padding: '1px 3px',
        lineHeight: 1.2,
      },
      '& > li': {
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
      },
      '& > completion-section': {
        display: 'list-item',
        borderBottom: '1px solid silver',
        paddingLeft: '0.5em',
        opacity: 0.7,
      },
    },
  },
  '&light .cm-tooltip-autocomplete ul li[aria-selected]': {
    background: '#17c',
    color: 'white',
  },
  '&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
    background: '#777',
  },
  '&dark .cm-tooltip-autocomplete ul li[aria-selected]': {
    background: '#347',
    color: 'white',
  },
  '&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
    background: '#444',
  },
  '.cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after': {
    content: '"···"',
    opacity: 0.5,
    display: 'block',
    textAlign: 'center',
  },
  '.cm-tooltip.cm-completionInfo': {
    position: 'absolute',
    padding: '3px 9px',
    width: 'max-content',
    maxWidth: `${400}px`,
    boxSizing: 'border-box',
  },
  '.cm-completionInfo.cm-completionInfo-left': { right: '100%' },
  '.cm-completionInfo.cm-completionInfo-right': { left: '100%' },
  '.cm-completionInfo.cm-completionInfo-left-narrow': { right: `${30}px` },
  '.cm-completionInfo.cm-completionInfo-right-narrow': { left: `${30}px` },
  '&light .cm-snippetField': { backgroundColor: '#00000022' },
  '&dark .cm-snippetField': { backgroundColor: '#ffffff22' },
  '.cm-snippetFieldPosition': {
    verticalAlign: 'text-top',
    width: 0,
    height: '1.15em',
    display: 'inline-block',
    margin: '0 -0.7px -.7em',
    borderLeft: '1.4px dotted #888',
  },
  '.cm-completionMatchedText': {
    textDecoration: 'underline',
  },
  '.cm-completionDetail': {
    marginLeft: '0.5em',
    fontStyle: 'italic',
  },
  '.cm-completionIcon': {
    fontSize: '90%',
    width: '.8em',
    display: 'inline-block',
    textAlign: 'center',
    paddingRight: '.6em',
    opacity: '0.6',
    boxSizing: 'content-box',
  },
  '.cm-completionIcon-function, .cm-completionIcon-method': {
    '&:after': { content: "'ƒ'" },
  },
  '.cm-completionIcon-class': {
    '&:after': { content: "'○'" },
  },
  '.cm-completionIcon-interface': {
    '&:after': { content: "'◌'" },
  },
  '.cm-completionIcon-variable': {
    '&:after': { content: "'𝑥'" },
  },
  '.cm-completionIcon-constant': {
    '&:after': { content: "'𝐶'" },
  },
  '.cm-completionIcon-type': {
    '&:after': { content: "'𝑡'" },
  },
  '.cm-completionIcon-enum': {
    '&:after': { content: "'∪'" },
  },
  '.cm-completionIcon-property': {
    '&:after': { content: "'□'" },
  },
  '.cm-completionIcon-keyword': {
    '&:after': { content: "'🔑︎'" },
    // Disable emoji rendering
  },
  '.cm-completionIcon-namespace': {
    '&:after': { content: "'▢'" },
  },
  '.cm-completionIcon-text': {
    '&:after': { content: "'abc'", fontSize: '50%', verticalAlign: 'middle' },
  },
});
var FieldPos = class {
  constructor(field, line, from, to) {
    this.field = field;
    this.line = line;
    this.from = from;
    this.to = to;
  }
};
var FieldRange = class _FieldRange {
  constructor(field, from, to) {
    this.field = field;
    this.from = from;
    this.to = to;
  }
  map(changes) {
    let from = changes.mapPos(this.from, -1, MapMode.TrackDel);
    let to = changes.mapPos(this.to, 1, MapMode.TrackDel);
    return from == null || to == null ? null : new _FieldRange(this.field, from, to);
  }
};
var Snippet = class _Snippet {
  constructor(lines, fieldPositions) {
    this.lines = lines;
    this.fieldPositions = fieldPositions;
  }
  instantiate(state, pos) {
    let text = [],
      lineStart = [pos];
    let lineObj = state.doc.lineAt(pos),
      baseIndent = /^\s*/.exec(lineObj.text)[0];
    for (let line of this.lines) {
      if (text.length) {
        let indent = baseIndent,
          tabs = /^\t*/.exec(line)[0].length;
        for (let i = 0; i < tabs; i++) indent += state.facet(indentUnit);
        lineStart.push(pos + indent.length - tabs);
        line = indent + line.slice(tabs);
      }
      text.push(line);
      pos += line.length + 1;
    }
    let ranges = this.fieldPositions.map(
      (pos2) => new FieldRange(pos2.field, lineStart[pos2.line] + pos2.from, lineStart[pos2.line] + pos2.to),
    );
    return { text, ranges };
  }
  static parse(template) {
    let fields = [];
    let lines = [],
      positions = [],
      m;
    for (let line of template.split(/\r\n?|\n/)) {
      while ((m = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(line))) {
        let seq = m[1] ? +m[1] : null,
          name = m[2] || m[3] || '',
          found = -1;
        for (let i = 0; i < fields.length; i++) {
          if (seq != null ? fields[i].seq == seq : name ? fields[i].name == name : false) found = i;
        }
        if (found < 0) {
          let i = 0;
          while (i < fields.length && (seq == null || (fields[i].seq != null && fields[i].seq < seq))) i++;
          fields.splice(i, 0, { seq, name });
          found = i;
          for (let pos of positions) if (pos.field >= found) pos.field++;
        }
        positions.push(new FieldPos(found, lines.length, m.index, m.index + name.length));
        line = line.slice(0, m.index) + name + line.slice(m.index + m[0].length);
      }
      for (let esc; (esc = /\\([{}])/.exec(line)); ) {
        line = line.slice(0, esc.index) + esc[1] + line.slice(esc.index + esc[0].length);
        for (let pos of positions)
          if (pos.line == lines.length && pos.from > esc.index) {
            pos.from--;
            pos.to--;
          }
      }
      lines.push(line);
    }
    return new _Snippet(lines, positions);
  }
};
var fieldMarker = Decoration.widget({
  widget: new (class extends WidgetType {
    toDOM() {
      let span = document.createElement('span');
      span.className = 'cm-snippetFieldPosition';
      return span;
    }
    ignoreEvent() {
      return false;
    }
  })(),
});
var fieldRange = Decoration.mark({ class: 'cm-snippetField' });
var ActiveSnippet = class _ActiveSnippet {
  constructor(ranges, active) {
    this.ranges = ranges;
    this.active = active;
    this.deco = Decoration.set(ranges.map((r) => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)));
  }
  map(changes) {
    let ranges = [];
    for (let r of this.ranges) {
      let mapped = r.map(changes);
      if (!mapped) return null;
      ranges.push(mapped);
    }
    return new _ActiveSnippet(ranges, this.active);
  }
  selectionInsideField(sel) {
    return sel.ranges.every((range) =>
      this.ranges.some((r) => r.field == this.active && r.from <= range.from && r.to >= range.to),
    );
  }
};
var setActive = StateEffect.define({
  map(value, changes) {
    return value && value.map(changes);
  },
});
var moveToField = StateEffect.define();
var snippetState = StateField.define({
  create() {
    return null;
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setActive)) return effect.value;
      if (effect.is(moveToField) && value) return new ActiveSnippet(value.ranges, effect.value);
    }
    if (value && tr.docChanged) value = value.map(tr.changes);
    if (value && tr.selection && !value.selectionInsideField(tr.selection)) value = null;
    return value;
  },
  provide: (f) => EditorView.decorations.from(f, (val) => (val ? val.deco : Decoration.none)),
});
function fieldSelection(ranges, field) {
  return EditorSelection.create(ranges.filter((r) => r.field == field).map((r) => EditorSelection.range(r.from, r.to)));
}
function snippet(template) {
  let snippet2 = Snippet.parse(template);
  return (editor, completion, from, to) => {
    let { text, ranges } = snippet2.instantiate(editor.state, from);
    let spec = {
      changes: { from, to, insert: Text.of(text) },
      scrollIntoView: true,
      annotations: completion ? pickedCompletion.of(completion) : void 0,
    };
    if (ranges.length) spec.selection = fieldSelection(ranges, 0);
    if (ranges.length > 1) {
      let active = new ActiveSnippet(ranges, 0);
      let effects = (spec.effects = [setActive.of(active)]);
      if (editor.state.field(snippetState, false) === void 0)
        effects.push(StateEffect.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme]));
    }
    editor.dispatch(editor.state.update(spec));
  };
}
function moveField(dir) {
  return ({ state, dispatch }) => {
    let active = state.field(snippetState, false);
    if (!active || (dir < 0 && active.active == 0)) return false;
    let next = active.active + dir,
      last = dir > 0 && !active.ranges.some((r) => r.field == next + dir);
    dispatch(
      state.update({
        selection: fieldSelection(active.ranges, next),
        effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next)),
      }),
    );
    return true;
  };
}
var clearSnippet = ({ state, dispatch }) => {
  let active = state.field(snippetState, false);
  if (!active) return false;
  dispatch(state.update({ effects: setActive.of(null) }));
  return true;
};
var nextSnippetField = moveField(1);
var prevSnippetField = moveField(-1);
var defaultSnippetKeymap = [
  { key: 'Tab', run: nextSnippetField, shift: prevSnippetField },
  { key: 'Escape', run: clearSnippet },
];
var snippetKeymap = Facet.define({
  combine(maps) {
    return maps.length ? maps[0] : defaultSnippetKeymap;
  },
});
var addSnippetKeymap = Prec.highest(keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
function snippetCompletion(template, completion) {
  return Object.assign(Object.assign({}, completion), { apply: snippet(template) });
}
var snippetPointerHandler = EditorView.domEventHandlers({
  mousedown(event, view) {
    let active = view.state.field(snippetState, false),
      pos;
    if (!active || (pos = view.posAtCoords({ x: event.clientX, y: event.clientY })) == null) return false;
    let match = active.ranges.find((r) => r.from <= pos && r.to >= pos);
    if (!match || match.field == active.active) return false;
    view.dispatch({
      selection: fieldSelection(active.ranges, match.field),
      effects: setActive.of(
        active.ranges.some((r) => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null,
      ),
    });
    return true;
  },
});
var defaults = {
  brackets: ['(', '[', '{', "'", '"'],
  before: ')]}:;>',
  stringPrefixes: [],
};
var closeBracketEffect = StateEffect.define({
  map(value, mapping) {
    let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter);
    return mapped == null ? void 0 : mapped;
  },
});
var closedBracket = new (class extends RangeValue {})();
closedBracket.startSide = 1;
closedBracket.endSide = -1;
var bracketState = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(value, tr) {
    if (tr.selection) {
      let lineStart = tr.state.doc.lineAt(tr.selection.main.head).from;
      let prevLineStart = tr.startState.doc.lineAt(tr.startState.selection.main.head).from;
      if (lineStart != tr.changes.mapPos(prevLineStart, -1)) value = RangeSet.empty;
    }
    value = value.map(tr.changes);
    for (let effect of tr.effects)
      if (effect.is(closeBracketEffect))
        value = value.update({ add: [closedBracket.range(effect.value, effect.value + 1)] });
    return value;
  },
});
var definedClosing = '()[]{}<>';
function closing(ch) {
  for (let i = 0; i < definedClosing.length; i += 2)
    if (definedClosing.charCodeAt(i) == ch) return definedClosing.charAt(i + 1);
  return fromCodePoint(ch < 128 ? ch : ch + 1);
}
function config(state, pos) {
  return state.languageDataAt('closeBrackets', pos)[0] || defaults;
}
var android = typeof navigator == 'object' && /Android\b/.test(navigator.userAgent);
var inputHandler = EditorView.inputHandler.of((view, from, to, insert) => {
  if ((android ? view.composing : view.compositionStarted) || view.state.readOnly) return false;
  let sel = view.state.selection.main;
  if (
    insert.length > 2 ||
    (insert.length == 2 && codePointSize(codePointAt(insert, 0)) == 1) ||
    from != sel.from ||
    to != sel.to
  )
    return false;
  let tr = insertBracket(view.state, insert);
  if (!tr) return false;
  view.dispatch(tr);
  return true;
});
function insertBracket(state, bracket) {
  let conf = config(state, state.selection.main.head);
  let tokens = conf.brackets || defaults.brackets;
  for (let tok of tokens) {
    let closed = closing(codePointAt(tok, 0));
    if (bracket == tok)
      return closed == tok
        ? handleSame(state, tok, tokens.indexOf(tok + tok + tok) > -1, conf)
        : handleOpen(state, tok, closed, conf.before || defaults.before);
    if (bracket == closed && closedBracketAt(state, state.selection.main.from)) return handleClose(state, tok, closed);
  }
  return null;
}
function closedBracketAt(state, pos) {
  let found = false;
  state.field(bracketState).between(0, state.doc.length, (from) => {
    if (from == pos) found = true;
  });
  return found;
}
function nextChar(doc, pos) {
  let next = doc.sliceString(pos, pos + 2);
  return next.slice(0, codePointSize(codePointAt(next, 0)));
}
function handleOpen(state, open, close, closeBefore) {
  let dont = null,
    changes = state.changeByRange((range) => {
      if (!range.empty)
        return {
          changes: [
            { insert: open, from: range.from },
            { insert: close, from: range.to },
          ],
          effects: closeBracketEffect.of(range.to + open.length),
          range: EditorSelection.range(range.anchor + open.length, range.head + open.length),
        };
      let next = nextChar(state.doc, range.head);
      if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1)
        return {
          changes: { insert: open + close, from: range.head },
          effects: closeBracketEffect.of(range.head + open.length),
          range: EditorSelection.cursor(range.head + open.length),
        };
      return { range: (dont = range) };
    });
  return dont
    ? null
    : state.update(changes, {
        scrollIntoView: true,
        userEvent: 'input.type',
      });
}
function handleClose(state, _open, close) {
  let dont = null,
    changes = state.changeByRange((range) => {
      if (range.empty && nextChar(state.doc, range.head) == close)
        return {
          changes: { from: range.head, to: range.head + close.length, insert: close },
          range: EditorSelection.cursor(range.head + close.length),
        };
      return (dont = { range });
    });
  return dont
    ? null
    : state.update(changes, {
        scrollIntoView: true,
        userEvent: 'input.type',
      });
}
function handleSame(state, token, allowTriple, config2) {
  let stringPrefixes = config2.stringPrefixes || defaults.stringPrefixes;
  let dont = null,
    changes = state.changeByRange((range) => {
      if (!range.empty)
        return {
          changes: [
            { insert: token, from: range.from },
            { insert: token, from: range.to },
          ],
          effects: closeBracketEffect.of(range.to + token.length),
          range: EditorSelection.range(range.anchor + token.length, range.head + token.length),
        };
      let pos = range.head,
        next = nextChar(state.doc, pos),
        start;
      if (next == token) {
        if (nodeStart(state, pos)) {
          return {
            changes: { insert: token + token, from: pos },
            effects: closeBracketEffect.of(pos + token.length),
            range: EditorSelection.cursor(pos + token.length),
          };
        } else if (closedBracketAt(state, pos)) {
          let isTriple = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token;
          let content = isTriple ? token + token + token : token;
          return {
            changes: { from: pos, to: pos + content.length, insert: content },
            range: EditorSelection.cursor(pos + content.length),
          };
        }
      } else if (
        allowTriple &&
        state.sliceDoc(pos - 2 * token.length, pos) == token + token &&
        (start = canStartStringAt(state, pos - 2 * token.length, stringPrefixes)) > -1 &&
        nodeStart(state, start)
      ) {
        return {
          changes: { insert: token + token + token + token, from: pos },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length),
        };
      } else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
        if (canStartStringAt(state, pos, stringPrefixes) > -1 && !probablyInString(state, pos, token, stringPrefixes))
          return {
            changes: { insert: token + token, from: pos },
            effects: closeBracketEffect.of(pos + token.length),
            range: EditorSelection.cursor(pos + token.length),
          };
      }
      return { range: (dont = range) };
    });
  return dont
    ? null
    : state.update(changes, {
        scrollIntoView: true,
        userEvent: 'input.type',
      });
}
function nodeStart(state, pos) {
  let tree = syntaxTree(state).resolveInner(pos + 1);
  return tree.parent && tree.from == pos;
}
function probablyInString(state, pos, quoteToken, prefixes) {
  let node = syntaxTree(state).resolveInner(pos, -1);
  let maxPrefix = prefixes.reduce((m, p) => Math.max(m, p.length), 0);
  for (let i = 0; i < 5; i++) {
    let start = state.sliceDoc(node.from, Math.min(node.to, node.from + quoteToken.length + maxPrefix));
    let quotePos = start.indexOf(quoteToken);
    if (!quotePos || (quotePos > -1 && prefixes.indexOf(start.slice(0, quotePos)) > -1)) {
      let first = node.firstChild;
      while (first && first.from == node.from && first.to - first.from > quoteToken.length + quotePos) {
        if (state.sliceDoc(first.to - quoteToken.length, first.to) == quoteToken) return false;
        first = first.firstChild;
      }
      return true;
    }
    let parent = node.to == pos && node.parent;
    if (!parent) break;
    node = parent;
  }
  return false;
}
function canStartStringAt(state, pos, prefixes) {
  let charCat = state.charCategorizer(pos);
  if (charCat(state.sliceDoc(pos - 1, pos)) != CharCategory.Word) return pos;
  for (let prefix of prefixes) {
    let start = pos - prefix.length;
    if (state.sliceDoc(start, pos) == prefix && charCat(state.sliceDoc(start - 1, start)) != CharCategory.Word)
      return start;
  }
  return -1;
}
var completionKeymap = [
  { key: 'Ctrl-Space', run: startCompletion },
  { key: 'Escape', run: closeCompletion },
  { key: 'ArrowDown', run: moveCompletionSelection(true) },
  { key: 'ArrowUp', run: moveCompletionSelection(false) },
  { key: 'PageDown', run: moveCompletionSelection(true, 'page') },
  { key: 'PageUp', run: moveCompletionSelection(false, 'page') },
  { key: 'Enter', run: acceptCompletion },
];
var completionKeymapExt = Prec.highest(
  keymap.computeN([completionConfig], (state) =>
    state.facet(completionConfig).defaultKeymap ? [completionKeymap] : [],
  ),
);

// ../../node_modules/.pnpm/@codemirror+lang-javascript@6.1.9/node_modules/@codemirror/lang-javascript/dist/index.js
var snippets = [
  snippetCompletion('function ${name}(${params}) {\n	${}\n}', {
    label: 'function',
    detail: 'definition',
    type: 'keyword',
  }),
  snippetCompletion('for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}', {
    label: 'for',
    detail: 'loop',
    type: 'keyword',
  }),
  snippetCompletion('for (let ${name} of ${collection}) {\n	${}\n}', {
    label: 'for',
    detail: 'of loop',
    type: 'keyword',
  }),
  snippetCompletion('do {\n	${}\n} while (${})', {
    label: 'do',
    detail: 'loop',
    type: 'keyword',
  }),
  snippetCompletion('while (${}) {\n	${}\n}', {
    label: 'while',
    detail: 'loop',
    type: 'keyword',
  }),
  snippetCompletion('try {\n	${}\n} catch (${error}) {\n	${}\n}', {
    label: 'try',
    detail: '/ catch block',
    type: 'keyword',
  }),
  snippetCompletion('if (${}) {\n	${}\n}', {
    label: 'if',
    detail: 'block',
    type: 'keyword',
  }),
  snippetCompletion('if (${}) {\n	${}\n} else {\n	${}\n}', {
    label: 'if',
    detail: '/ else block',
    type: 'keyword',
  }),
  snippetCompletion('class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}', {
    label: 'class',
    detail: 'definition',
    type: 'keyword',
  }),
  snippetCompletion('import {${names}} from "${module}"\n${}', {
    label: 'import',
    detail: 'named',
    type: 'keyword',
  }),
  snippetCompletion('import ${name} from "${module}"\n${}', {
    label: 'import',
    detail: 'default',
    type: 'keyword',
  }),
];
var cache = new NodeWeakMap();
var ScopeNodes = /* @__PURE__ */ new Set([
  'Script',
  'Block',
  'FunctionExpression',
  'FunctionDeclaration',
  'ArrowFunction',
  'MethodDeclaration',
  'ForStatement',
]);
function defID(type) {
  return (node, def) => {
    let id = node.node.getChild('VariableDefinition');
    if (id) def(id, type);
    return true;
  };
}
var functionContext = ['FunctionDeclaration'];
var gatherCompletions = {
  FunctionDeclaration: defID('function'),
  ClassDeclaration: defID('class'),
  ClassExpression: () => true,
  EnumDeclaration: defID('constant'),
  TypeAliasDeclaration: defID('type'),
  NamespaceDeclaration: defID('namespace'),
  VariableDefinition(node, def) {
    if (!node.matchContext(functionContext)) def(node, 'variable');
  },
  TypeDefinition(node, def) {
    def(node, 'type');
  },
  __proto__: null,
};
function getScope(doc, node) {
  let cached = cache.get(node);
  if (cached) return cached;
  let completions = [],
    top = true;
  function def(node2, type) {
    let name = doc.sliceString(node2.from, node2.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
    if (top) {
      top = false;
    } else if (node2.name) {
      let gather = gatherCompletions[node2.name];
      if ((gather && gather(node2, def)) || ScopeNodes.has(node2.name)) return false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope(doc, node2.node)) completions.push(c);
      return false;
    }
  });
  cache.set(node, completions);
  return completions;
}
var Identifier = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/;
var dontComplete = [
  'TemplateString',
  'String',
  'RegExp',
  'LineComment',
  'BlockComment',
  'VariableDefinition',
  'TypeDefinition',
  'Label',
  'PropertyDefinition',
  'PropertyName',
  'PrivatePropertyDefinition',
  'PrivatePropertyName',
  '.',
  '?.',
];
function localCompletionSource(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete.indexOf(inner.name) > -1) return null;
  let isWord =
    inner.name == 'VariableName' ||
    (inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to)));
  if (!isWord && !context.explicit) return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name)) options = options.concat(getScope(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier,
  };
}
function pathFor(read, member, name) {
  var _a;
  let path = [];
  for (;;) {
    let obj = member.firstChild,
      prop;
    if ((obj === null || obj === void 0 ? void 0 : obj.name) == 'VariableName') {
      path.push(read(obj));
      return { path: path.reverse(), name };
    } else if (
      (obj === null || obj === void 0 ? void 0 : obj.name) == 'MemberExpression' &&
      ((_a = prop = obj.lastChild) === null || _a === void 0 ? void 0 : _a.name) == 'PropertyName'
    ) {
      path.push(read(prop));
      member = obj;
    } else {
      return null;
    }
  }
}
function completionPath(context) {
  let read = (node) => context.state.doc.sliceString(node.from, node.to);
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (inner.name == 'PropertyName') {
    return pathFor(read, inner.parent, read(inner));
  } else if ((inner.name == '.' || inner.name == '?.') && inner.parent.name == 'MemberExpression') {
    return pathFor(read, inner.parent, '');
  } else if (dontComplete.indexOf(inner.name) > -1) {
    return null;
  } else if (inner.name == 'VariableName' || (inner.to - inner.from < 20 && Identifier.test(read(inner)))) {
    return { path: [], name: read(inner) };
  } else if (inner.name == 'MemberExpression') {
    return pathFor(read, inner, '');
  } else {
    return context.explicit ? { path: [], name: '' } : null;
  }
}
function enumeratePropertyCompletions(obj, top) {
  let options = [],
    seen = /* @__PURE__ */ new Set();
  for (let depth = 0; ; depth++) {
    for (let name of (Object.getOwnPropertyNames || Object.keys)(obj)) {
      if (!/^[a-zA-Z_$][\w$]*$/.test(name) || seen.has(name)) continue;
      seen.add(name);
      let value;
      try {
        value = obj[name];
      } catch (_) {
        continue;
      }
      options.push({
        label: name,
        type:
          typeof value == 'function'
            ? /^[A-Z]/.test(name)
              ? 'class'
              : top
              ? 'function'
              : 'method'
            : top
            ? 'variable'
            : 'property',
        boost: -depth,
      });
    }
    let next = Object.getPrototypeOf(obj);
    if (!next) return options;
    obj = next;
  }
}
function scopeCompletionSource(scope) {
  let cache2 = /* @__PURE__ */ new Map();
  return (context) => {
    let path = completionPath(context);
    if (!path) return null;
    let target = scope;
    for (let step of path.path) {
      target = target[step];
      if (!target) return null;
    }
    let options = cache2.get(target);
    if (!options) cache2.set(target, (options = enumeratePropertyCompletions(target, !path.path.length)));
    return {
      from: context.pos - path.name.length,
      options,
      validFor: Identifier,
    };
  };
}
var javascriptLanguage = LRLanguage.define({
  name: 'javascript',
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        IfStatement: continuedIndent({ except: /^\s*({|else\b)/ }),
        TryStatement: continuedIndent({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: flatIndent,
        SwitchBody: (context) => {
          let after = context.textAfter,
            closed = /^\s*\}/.test(after),
            isCase = /^\s*(case|default)\b/.test(after);
          return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
        },
        Block: delimitedIndent({ closing: '}' }),
        ArrowFunction: (cx) => cx.baseIndent + cx.unit,
        'TemplateString BlockComment': () => null,
        'Statement Property': continuedIndent({ except: /^{/ }),
        JSXElement(context) {
          let closed = /^\s*<\//.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        JSXEscape(context) {
          let closed = /\s*\}/.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        'JSXOpenTag JSXSelfClosingTag'(context) {
          return context.column(context.node.from) + context.unit;
        },
      }),
      foldNodeProp.add({
        'Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType': foldInside,
        BlockComment(tree) {
          return { from: tree.from + 2, to: tree.to - 2 };
        },
      }),
    ],
  }),
  languageData: {
    closeBrackets: { brackets: ['(', '[', '{', "'", '"', '`'] },
    commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: '$',
  },
});
var jsxSublanguage = {
  test: (node) => /^JSX/.test(node.name),
  facet: defineLanguageFacet({ commentTokens: { block: { open: '{/*', close: '*/}' } } }),
};
var typescriptLanguage = javascriptLanguage.configure({ dialect: 'ts' }, 'typescript');
var jsxLanguage = javascriptLanguage.configure({
  dialect: 'jsx',
  props: [sublanguageProp.add((n) => (n.isTop ? [jsxSublanguage] : void 0))],
});
var tsxLanguage = javascriptLanguage.configure(
  {
    dialect: 'jsx ts',
    props: [sublanguageProp.add((n) => (n.isTop ? [jsxSublanguage] : void 0))],
  },
  'typescript',
);
var keywords =
  'break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield'
    .split(' ')
    .map((kw) => ({ label: kw, type: 'keyword' }));
function javascript(config2 = {}) {
  let lang = config2.jsx
    ? config2.typescript
      ? tsxLanguage
      : jsxLanguage
    : config2.typescript
    ? typescriptLanguage
    : javascriptLanguage;
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(snippets.concat(keywords))),
    }),
    javascriptLanguage.data.of({
      autocomplete: localCompletionSource,
    }),
    config2.jsx ? autoCloseTags : [],
  ]);
}
function findOpenTag(node) {
  for (;;) {
    if (node.name == 'JSXOpenTag' || node.name == 'JSXSelfClosingTag' || node.name == 'JSXFragmentTag') return node;
    if (node.name == 'JSXEscape' || !node.parent) return null;
    node = node.parent;
  }
}
function elementName(doc, tree, max = doc.length) {
  for (let ch = tree === null || tree === void 0 ? void 0 : tree.firstChild; ch; ch = ch.nextSibling) {
    if (
      ch.name == 'JSXIdentifier' ||
      ch.name == 'JSXBuiltin' ||
      ch.name == 'JSXNamespacedName' ||
      ch.name == 'JSXMemberExpression'
    )
      return doc.sliceString(ch.from, Math.min(ch.to, max));
  }
  return '';
}
function isEndTag(node) {
  return node && (node.name == 'JSXEndTag' || node.name == 'JSXSelfCloseEndTag');
}
var android2 = typeof navigator == 'object' && /Android\b/.test(navigator.userAgent);
var autoCloseTags = EditorView.inputHandler.of((view, from, to, text) => {
  if (
    (android2 ? view.composing : view.compositionStarted) ||
    view.state.readOnly ||
    from != to ||
    (text != '>' && text != '/') ||
    !javascriptLanguage.isActiveAt(view.state, from, -1)
  )
    return false;
  let { state } = view;
  let changes = state.changeByRange((range) => {
    var _a;
    let { head } = range,
      around = syntaxTree(state).resolveInner(head, -1),
      name;
    if (around.name == 'JSXStartTag') around = around.parent;
    if (around.name == 'JSXAttributeValue' && around.to > head);
    else if (text == '>' && around.name == 'JSXFragmentTag') {
      return { range: EditorSelection.cursor(head + 1), changes: { from: head, insert: `></>` } };
    } else if (text == '/' && around.name == 'JSXFragmentTag') {
      let empty = around.parent,
        base = empty === null || empty === void 0 ? void 0 : empty.parent;
      if (
        empty.from == head - 1 &&
        ((_a = base.lastChild) === null || _a === void 0 ? void 0 : _a.name) != 'JSXEndTag' &&
        (name = elementName(state.doc, base === null || base === void 0 ? void 0 : base.firstChild, head))
      ) {
        let insert = `/${name}>`;
        return { range: EditorSelection.cursor(head + insert.length), changes: { from: head, insert } };
      }
    } else if (text == '>') {
      let openTag = findOpenTag(around);
      if (
        openTag &&
        !isEndTag(openTag.lastChild) &&
        state.sliceDoc(head, head + 2) != '</' &&
        (name = elementName(state.doc, openTag, head))
      )
        return { range: EditorSelection.cursor(head + 1), changes: { from: head, insert: `></${name}>` } };
    }
    return { range };
  });
  if (changes.changes.empty) return false;
  view.dispatch(changes, { userEvent: 'input.type', scrollIntoView: true });
  return true;
});
function esLint(eslint, config2) {
  if (!config2) {
    config2 = {
      parserOptions: { ecmaVersion: 2019, sourceType: 'module' },
      env: { browser: true, node: true, es6: true, es2015: true, es2017: true, es2020: true },
      rules: {},
    };
    eslint.getRules().forEach((desc, name) => {
      if (desc.meta.docs.recommended) config2.rules[name] = 2;
    });
  }
  return (view) => {
    let { state } = view,
      found = [];
    for (let { from, to } of javascriptLanguage.findRegions(state)) {
      let fromLine = state.doc.lineAt(from),
        offset = { line: fromLine.number - 1, col: from - fromLine.from, pos: from };
      for (let d of eslint.verify(state.sliceDoc(from, to), config2))
        found.push(translateDiagnostic(d, state.doc, offset));
    }
    return found;
  };
}
function mapPos(line, col, doc, offset) {
  return doc.line(line + offset.line).from + col + (line == 1 ? offset.col - 1 : -1);
}
function translateDiagnostic(input, doc, offset) {
  let start = mapPos(input.line, input.column, doc, offset);
  let result = {
    from: start,
    to: input.endLine != null && input.endColumn != 1 ? mapPos(input.endLine, input.endColumn, doc, offset) : start,
    message: input.message,
    source: input.ruleId ? 'eslint:' + input.ruleId : 'eslint',
    severity: input.severity == 1 ? 'warning' : 'error',
  };
  if (input.fix) {
    let { range, text } = input.fix,
      from = range[0] + offset.pos - start,
      to = range[1] + offset.pos - start;
    result.actions = [
      {
        name: 'fix',
        apply(view, start2) {
          view.dispatch({ changes: { from: start2 + from, to: start2 + to, insert: text }, scrollIntoView: true });
        },
      },
    ];
  }
  return result;
}

export {
  snippets,
  localCompletionSource,
  completionPath,
  scopeCompletionSource,
  javascriptLanguage,
  typescriptLanguage,
  jsxLanguage,
  tsxLanguage,
  javascript,
  autoCloseTags,
  esLint,
};
//# sourceMappingURL=chunk-YQB22COW.js.map
