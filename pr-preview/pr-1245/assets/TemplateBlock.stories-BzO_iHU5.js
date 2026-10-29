import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,r as n}from"./iframe-D0s0gGAm.js";import{$r as r,At as i,Bt as a,C as o,Cr as s,Dr as c,E as l,Ei as u,Et as d,Ft as f,Ht as p,I as m,It as h,J as g,Lt as _,Mt as v,Nt as y,Or as b,Pt as x,Rt as S,Sa as C,Sn as ee,St as w,T as te,Ti as ne,Ui as re,Ut as ie,Vt as ae,Wi as oe,Wt as se,_a as ce,_n as le,a as T,an as ue,ar as E,ba as de,bn as D,c as fe,ci as pe,ct as O,d as me,da as he,di as ge,ei as _e,fi as ve,fr as ye,g as be,ga as k,gn as xe,i as Se,ia as Ce,in as we,j as Te,jt as Ee,kt as De,l as A,la as Oe,lr as ke,n as Ae,ni as je,o as Me,oa as Ne,on as Pe,ot as Fe,pa as Ie,pt as Le,q as Re,r as ze,s as Be,si as Ve,sn as He,t as Ue,ti as We,u as Ge,vr as Ke,yn as j,zt as qe}from"./StyleProvider-DFVl6yZK.js";import{i as Je,l as Ye,n as Xe,r as Ze,s as Qe,t as $e}from"./useImageContainer-z_McFfPb.js";var M;function N(){return(N=e((()=>{M=`template`})))()}var P,F,I,L,R,et,tt,nt,rt,it,at,z,B,ot,st,ct,V;function H(){return(H=e((()=>{A(),P=function(e){return e.None=`none`,e.Template=`template`,e.Custom=`custom`,e}({}),F=function(e){return e.Bottom=`bottom`,e.Top=`top`,e.Right=`right`,e.Left=`left`,e}({}),I=function(e){return e.Start=`start`,e.Center=`center`,e.End=`end`,e}({}),L=function(e){return e.OneQuarter=`25`,e.OneThird=`33.3333`,e.OneHalf=`50`,e.TwoThirds=`66.6666`,e.ThreeQuarters=`75`,e}({}),R=function(e){return e.Auto=`auto`,e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e}({}),et={bottom:`tw-flex-col`,top:`tw-flex-col-reverse`,right:`tw-flex-col @sm:tw-flex-row`,left:`tw-flex-col-reverse @sm:tw-flex-row-reverse`},tt={start:`lg:tw-items-start`,center:`lg:tw-items-center`,end:`lg:tw-items-end`},nt={start:`lg:tw-text-left`,center:`lg:tw-text-center`,end:`lg:tw-text-right`},rt={start:`lg:tw-self-start`,center:`lg:tw-self-center`,end:`lg:tw-self-end`},it={25:`lg:tw-basis-1/4`,"33.3333":`lg:tw-basis-1/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-2/3`,75:`lg:tw-basis-3/4`},at={25:`lg:tw-basis-3/4`,"33.3333":`lg:tw-basis-2/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-1/3`,75:`lg:tw-basis-1/4`},z={auto:`auto`,small:`240px`,medium:`480px`,large:`640px`},B=function(e){return e.Fit=`fit`,e.Fill=`fill`,e}({}),ot={fit:`tw-object-contain`,fill:`tw-object-cover`},st={start:`left`,center:`center`,end:`right`},ct={[E.None]:`0px`,[E.Small]:`10px`,[E.Medium]:`20px`,[E.Large]:`30px`},V=function(e){return e.Simple=`simple`,e.Advanced=`advanced`,e}({})})))()}var U,W,lt;function ut(){return(ut=e((()=>{k(),A(),N(),H(),U={red:255,green:255,blue:255,alpha:0},W={red:234,green:235,blue:235,alpha:1},lt=me({main:[],basics:[{id:M,type:`templateInput`,label:`Template`,showForTranslations:!0},{id:`hasPageCount`,type:`switch`,defaultValue:!1,label:`Show page count`,info:`Show or hide the page count indicator`},{id:`preview`,type:`slider`,label:`Preview`,choices:[{label:`Template`,value:P.Template},{label:`Custom`,value:P.Custom},{label:`None`,value:P.None}],defaultValue:P.Template,showForTranslations:!0},{id:`previewCustom`,type:`assetInput`,size:`small`,extensions:Ce.Images,label:`Custom Preview`,show:e=>e.getBlock(`preview`)?.value===P.Custom,showForTranslations:!0},{id:`templateEditingHeading`,type:`sectionHeading`,blocks:[{id:`templateEditing`,label:`Template editing`,info:`Choose how users can make changes to the template.`,type:`slider`,choices:[{label:`Simple`,value:V.Simple},{label:`Advanced`,value:V.Advanced}],defaultValue:V.Advanced,showForTranslations:!0},{id:`templateEditingNotificationSimple`,type:`notification`,text:`Users can only make changes by selecting and editing fields in the settings panel without approvals.`,show:e=>e.getBlock(`templateEditing`)?.value===V.Simple,styles:{type:g.Info},showForTranslations:!0},{id:`templateEditingNotificationAdvanced`,type:`notification`,text:`Users can select layers and edit text directly.`,show:e=>e.getBlock(`templateEditing`)?.value===V.Advanced,styles:{type:g.Info},showForTranslations:!0}]}],layout:[{id:`cardLayoutHeading`,type:`sectionHeading`,label:`Card`,blocks:[be({id:`blockCard`,paddingStyleMap:ct})]},{id:`textLayoutHeading`,type:`sectionHeading`,label:`Text`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{id:`textPositioning`,label:`Positioning`,type:`slider`,defaultValue:F.Right,info:`Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.`,choices:[{value:F.Bottom,icon:`MediaObjectTextBottom`},{value:F.Top,icon:`MediaObjectTextTop`},{value:F.Right,icon:`MediaObjectTextRight`},{value:F.Left,icon:`MediaObjectTextLeft`}]},{id:`textRatio`,label:`Ratio`,type:`slider`,defaultValue:L.OneHalf,info:`The text to image width ratio. Some settings won't apply if the container is too narrow.`,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Right||t===F.Left},choices:[{value:L.OneQuarter,icon:`MediaObjectRatio3To1`},{value:L.OneThird,icon:`MediaObjectRatio2To1`},{value:L.OneHalf,icon:`MediaObjectRatio1To1`},{value:L.TwoThirds,icon:`MediaObjectRatio1To2`},{value:L.ThreeQuarters,icon:`MediaObjectRatio1To3`}]},{id:`textAnchoringVertical`,type:`slider`,label:`Vertical alignment`,defaultValue:I.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Right||t===F.Left},choices:[{value:I.Start,icon:`ArrowAlignUp`},{value:I.Center,icon:`ArrowAlignHorizontalCentre`},{value:I.End,icon:`ArrowAlignDown`}]},{id:`textAnchoringHorizontal`,type:`slider`,label:`Horizontal alignment`,defaultValue:I.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Top||t===F.Bottom},choices:[{value:I.Start,icon:`ArrowAlignLeft`},{value:I.Center,icon:`ArrowAlignVerticalCentre`},{value:I.End,icon:`ArrowAlignRight`}]}]},{id:`previewLayoutHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{id:`isPreviewHeightCustom`,type:`switch`,label:`Height`,switchLabel:`Custom`,info:`Determines the preview height.`,defaultValue:!1,onChange:e=>{l(e,`previewHeightSimple`,`previewHeightCustom`,z)},on:[{id:`previewHeightCustom`,type:`input`,placeholder:`e.g. 50px`,clearable:!0,rules:[m,Te(10)],onChange:e=>{Re(e,`previewHeightCustom`)}}],off:[{id:`previewHeightSimple`,type:`slider`,defaultValue:R.Auto,choices:[{value:R.Auto,label:`Auto`},{value:R.Small,label:`S`},{value:R.Medium,label:`M`},{value:R.Large,label:`L`}]}]},{id:`previewDisplay`,type:`slider`,label:`Display`,defaultValue:B.Fit,show:e=>e.getBlock(`previewHeightSimple`)?.value!==R.Auto,choices:[{value:B.Fit,label:`Fit`},{value:B.Fill,label:`Fill`}]},{id:`previewImageAnchoring`,type:`slider`,label:`Image anchoring`,defaultValue:I.Center,show:e=>e.getBlock(`previewHeightSimple`)?.value!==R.Auto&&e.getBlock(`previewDisplay`)?.value===B.Fit,choices:[{value:I.Start,icon:`ArrowAlignLeft`},{value:I.Center,icon:`ArrowAlignVerticalCentre`},{value:I.End,icon:`ArrowAlignRight`}]}]}],style:[{id:`buttonStyleHeading`,type:`sectionHeading`,label:`Button`,blocks:[{id:`buttonStyle`,type:`dropdown`,size:`small`,defaultValue:`primary`,label:`Style`,choices:[{label:`Primary`,value:`primary`},{label:`Secondary`,value:`secondary`},{label:`Tertiary`,value:`tertiary`}]}]},{id:`cardStyleHeading`,type:`sectionHeading`,label:`Card`,blocks:[{...Fe({defaultValue:!0,defaultColor:U})},{...te({id:`blockCard`,defaultValue:!0,defaultColor:W})},{...o({id:`blockCard`}),show:e=>e.getBlock(`hasBackground`)?.value===!0||e.getBlock(`hasBorder_blockCard`)?.value===!0,onChange:e=>e.setBlockValue(`radiusValue_blockCard`,ke[e.getBlock(`radiusChoice_blockCard`)?.value])}]},{id:`previewStyleHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{...Fe({id:`TemplatePreview`,defaultValue:!0,defaultColor:U})},{...te({id:`templatePreview`,defaultValue:!0,defaultColor:W})},{...o({id:`templatePreview`}),onChange:e=>e.setBlockValue(`radiusValue_templatePreview`,ke[e.getBlock(`radiusChoice_templatePreview`)?.value])}]}]})})))()}var dt,ft;function pt(){return(pt=e((()=>{dt=`template-block`,ft={scope:dt}})))()}var mt,ht;function gt(){return(gt=e((()=>{ne(),mt=t(),ht=({errorMessage:e})=>(0,mt.jsxs)(`span`,{"aria-live":`polite`,className:`tw-p-5 tw-flex tw-gap-4 tw-mb-4 tw-items-center tw-rounded-sm tw-transition-opacity tw-ease-in-out tw-bg-container-error tw-text-container-error-on-error-container`,children:[(0,mt.jsx)(`span`,{children:(0,mt.jsx)(u,{size:16})}),e]}),ht.__docgenInfo={description:``,methods:[],displayName:`AlertError`,props:{errorMessage:{required:!0,tsType:{name:`string`},description:``}}}})))()}var _t,vt,yt,bt;function xt(){return(xt=e((()=>{se(),A(),_t=n(),H(),vt=t(),yt=new ie({noToolbar:!0}).setPlugin(),bt=({blockSettings:e,isEditing:t,isDisabled:n,updateBlockSettings:r,handleNewPublication:a})=>{let[o,s]=(0,_t.useState)(!1),{buttonText:c,preview:l,buttonStyle:u}=e,d=(0,_t.useCallback)(e=>r({buttonText:e}),[r]),f=l===P.None?`!tw-m-0`:`!tw-mb-0`,p=(()=>{switch(u){case`primary`:return i.buttonPrimary;case`secondary`:return i.buttonSecondary;case`tertiary`:return i.buttonTertiary;default:return i.buttonPrimary}})();return(0,vt.jsx)(`button`,{type:`button`,"data-test-id":`cta-button`,disabled:n,onClick:t?void 0:a,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),className:`disabled:tw-opacity-50 ${f} [&>div]:!tw-@container-normal tw-max-w-full`,style:{...p,...o?p?.hover:null},children:(0,vt.jsx)(w,{value:D(c)?c:j(`p`,`Use this Template`),isEditing:t,plugins:yt,onTextChange:d})})},bt.__docgenInfo={description:``,methods:[],displayName:`CtaButton`,props:{blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},isDisabled:{required:!0,tsType:{name:`boolean`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var St,G,Ct;function wt(){return(wt=e((()=>{k(),oe(),pe(),We(),xe(),A(),Ye(),Je(),$e(),St=n(),H(),G=t(),Ct=({appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:i,onOpenTemplateChooser:a,handleDeleteCustomPreview:o})=>{let s=Oe(e),{preview:c,previewImageAnchoring:l,previewDisplay:u}=t,d=c===P.Custom&&r,f=d?r:n&&{previewUrl:n.previewUrl,genericUrl:n.previewUrl,originUrl:n.previewUrl,extension:``,width:null,height:null},{containerWidth:p,setContainerRef:m}=Xe(),h=t.altText??`Template preview`,g=le([`tw-relative tw-w-full tw-h-full`,ot[u]]),_={objectPosition:l?st[l]:`center`},[v,y]=(0,St.useState)(!1),[b,x]=(0,St.useState)(t.altText),[S,C]=(0,St.useState)(!1);return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{ref:m,className:`tw-block tw-w-full tw-h-full`,onMouseEnter:()=>C(!0),onMouseLeave:()=>C(!1),children:f&&(0,G.jsx)(Ze,{image:f,containerWidth:p,alt:h,className:g,style:_,testId:`preview-img`})}),s&&(0,G.jsx)(`div`,{className:`tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3`,children:(0,G.jsx)(ee,{shouldBeShown:S||v,toolbarItems:[{type:`menu`,items:(()=>{let e=[{title:`Set alt text`,onClick:()=>y(!0),icon:(0,G.jsx)(Ve,{size:20})},{title:`Replace template`,onClick:a,icon:(0,G.jsx)(re,{size:16})}];return d&&e.push({title:`Delete custom preview`,onClick:()=>o(r.id),style:`danger`,icon:(0,G.jsx)(je,{size:16})}),[e]})()}],children:(0,G.jsx)(Qe,{setShowAltTextMenu:y,showAltTextMenu:v,setLocalAltText:x,defaultAltText:t.altText,onSave:()=>i({altText:b||void 0}),localAltText:b})})})]})},Ct.__docgenInfo={description:``,methods:[],displayName:`PreviewImage`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}},description:``},template:{required:!0,tsType:{name:`union`,raw:`Template | null`,elements:[{name:`Template`},{name:`null`}]},description:``},previewCustom:{required:!0,tsType:{name:`union`,raw:`Asset | null`,elements:[{name:`Asset`},{name:`null`}]},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var K,Tt;function Et(){return(Et=e((()=>{k(),ge(),A(),ut(),H(),wt(),K=t(),Tt=({appBridge:e,blockSettings:t,template:n,previewCustom:r,previewClasses:i,updateBlockSettings:a,onOpenTemplateChooser:o,handleNewPublication:c,handleDeleteCustomPreview:l})=>{let u=Oe(e),{backgroundColorTemplatePreview:d,borderColor_templatePreview:f,borderStyle_templatePreview:p,borderWidth_templatePreview:m,hasBackgroundTemplatePreview:h,hasBorder_templatePreview:g,hasRadius_templatePreview:_,isPreviewHeightCustom:v,previewHeightCustom:y,previewHeightSimple:b,radiusChoice_templatePreview:x,radiusValue_templatePreview:S}=t,C=_?S:ke[x],ee=g?`${m} ${p} ${Ke(f||W)}`:`none`,w=v?y:z[b],te=!u&&n!==null;return(0,K.jsx)(`div`,{className:i,"data-test-id":`preview`,children:n!==null||r?(0,K.jsx)(`button`,{type:`button`,className:`tw-relative tw-overflow-hidden tw-w-full tw-h-full`,"data-test-id":`preview-wrapper`,style:{...h&&{...ye(d||U)},borderRadius:C,border:ee,height:w},onClick:c,disabled:!te,"aria-label":`Use this template`,children:(0,K.jsx)(Ct,{appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:a,onOpenTemplateChooser:o,handleDeleteCustomPreview:l})}):(0,K.jsx)(`div`,{style:{height:z[R.Small]},children:(0,K.jsx)(s,{label:`Choose existing template`,icon:(0,K.jsx)(ve,{}),withMenu:!1,fillParentContainer:!0,onClick:o})})})},Tt.__docgenInfo={description:``,methods:[],displayName:`TemplatePreview`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}},description:``},template:{required:!0,tsType:{name:`union`,raw:`Template | null`,elements:[{name:`Template`},{name:`null`}]},description:``},previewCustom:{required:!0,tsType:{name:`union`,raw:`Asset | null`,elements:[{name:`Asset`},{name:`null`}]},description:``},previewClasses:{required:!0,tsType:{name:`string`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var q,J,Dt;function Ot(){return(Ot=e((()=>{He(),ue(),h(),se(),p(),qe(),v(),_(),x(),A(),q=n(),J=t(),Dt=({appBridge:e,updateBlockSettings:t,title:n,description:r,pageCount:o,isEditing:s,hasTitleOnly:c,templateTextKey:l})=>{let u=i[De.imageCaption],p=o===1?`page`:`pages`,m=(0,q.useCallback)(async e=>{n!==e&&await t({title:e})},[n,t]),h=(0,q.useCallback)(async e=>{r!==e&&await t({description:e})},[r,t]),g=(0,q.useMemo)(()=>new ie().setPlugin([new a,new S({textStyles:Le})]).setPlugin([new we,new f,new y,new Ee]).setPlugin([new ae,new Pe]),[]),_=(0,q.useMemo)(()=>O(e),[e]),v=(0,q.useMemo)(()=>(0,J.jsx)(w,{value:n??j(De.heading3),placeholder:`Add a title`,onTextChange:m,isEditing:s,showSerializedText:D(n),plugins:g},l),[g,s,m,n,l]),b=(0,q.useMemo)(()=>(0,J.jsx)(w,{value:r,placeholder:`Add a description for your template`,onTextChange:h,showSerializedText:D(r),isEditing:s,plugins:_},l),[_,r,s,h,l]);return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{"data-test-id":`title`,style:(()=>{let e={[`${d}heading1-margin-top`]:`0`,[`${d}heading2-margin-top`]:`0`,[`${d}heading3-margin-top`]:`0`,[`${d}heading4-margin-top`]:`0`,[`${d}custom1-margin-top`]:`0`,[`${d}custom2-margin-top`]:`0`,[`${d}custom3-margin-top`]:`0`,[`${d}body-margin-top`]:`0`,[`${d}quote-margin-top`]:`0`},t={[`${d}heading1-margin-bottom`]:`0`,[`${d}heading2-margin-bottom`]:`0`,[`${d}heading3-margin-bottom`]:`0`,[`${d}heading4-margin-bottom`]:`0`,[`${d}custom1-margin-bottom`]:`0`,[`${d}custom2-margin-bottom`]:`0`,[`${d}custom3-margin-bottom`]:`0`,[`${d}body-margin-bottom`]:`0`,[`${d}quote-margin-bottom`]:`0`};return c?{...e,...t}:e})(),children:v}),o!==void 0&&(0,J.jsx)(`div`,{className:`tw-mb-2`,"data-test-id":`page-count`,children:(0,J.jsx)(`span`,{style:{...u},children:`${o} ${p}`})}),(0,J.jsx)(`div`,{className:s||D(r)?`tw-mt-2`:``,"data-test-id":`description`,children:b})]})},Dt.__docgenInfo={description:``,methods:[],displayName:`TemplateText`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},pageCount:{required:!0,tsType:{name:`union`,raw:`number | undefined`,elements:[{name:`number`},{name:`undefined`}]},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},hasTitleOnly:{required:!0,tsType:{name:`boolean`},description:``},templateTextKey:{required:!0,tsType:{name:`number`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
    title: string;
    description: string;

    // Basics
    templateEditing: TemplateEditing;
    preview: PreviewType;
    previewCustom?: Asset;
    buttonText?: string;
    altText?: string;

    // Layout
    hasCustomPaddingValue_blockCard: boolean;
    paddingValue_blockCard: string;
    paddingChoice_blockCard: Padding;

    textPositioning: TextPositioningType;

    textRatio: TextRatioType;

    textAnchoringHorizontal: AnchoringType;
    textAnchoringVertical: AnchoringType;

    hasPageCount: boolean;

    isPreviewHeightCustom: boolean;
    previewHeightCustom?: string;
    previewHeightSimple: PreviewHeightType;

    previewDisplay: PreviewDisplayType;

    previewImageAnchoring?: AnchoringType;

    // Style
    buttonStyle: RichTextButtonStyle;

    hasBackground: boolean;
    backgroundColor: Color | null;

    hasBorder_blockCard: boolean;
    borderWidth_blockCard: string;
    borderStyle_blockCard: BorderStyle;
    borderColor_blockCard: Color | null;

    hasRadius_blockCard: boolean;
    radiusValue_blockCard: string;
    radiusChoice_blockCard: Radius;

    hasBackgroundTemplatePreview: boolean;
    backgroundColorTemplatePreview: Color | null;

    hasBorder_templatePreview: boolean;
    borderWidth_templatePreview: string;
    borderStyle_templatePreview: BorderStyle;
    borderColor_templatePreview: Color | null;

    hasRadius_templatePreview: boolean;
    radiusValue_templatePreview: string;
    radiusChoice_templatePreview: Radius;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!0}},{key:`templateEditing`,value:{name:`TemplateEditing`,required:!0}},{key:`preview`,value:{name:`PreviewType`,required:!0}},{key:`previewCustom`,value:{name:`Asset`,required:!1}},{key:`buttonText`,value:{name:`string`,required:!1}},{key:`altText`,value:{name:`string`,required:!1}},{key:`hasCustomPaddingValue_blockCard`,value:{name:`boolean`,required:!0}},{key:`paddingValue_blockCard`,value:{name:`string`,required:!0}},{key:`paddingChoice_blockCard`,value:{name:`Padding`,required:!0}},{key:`textPositioning`,value:{name:`TextPositioningType`,required:!0}},{key:`textRatio`,value:{name:`TextRatioType`,required:!0}},{key:`textAnchoringHorizontal`,value:{name:`AnchoringType`,required:!0}},{key:`textAnchoringVertical`,value:{name:`AnchoringType`,required:!0}},{key:`hasPageCount`,value:{name:`boolean`,required:!0}},{key:`isPreviewHeightCustom`,value:{name:`boolean`,required:!0}},{key:`previewHeightCustom`,value:{name:`string`,required:!1}},{key:`previewHeightSimple`,value:{name:`PreviewHeightType`,required:!0}},{key:`previewDisplay`,value:{name:`PreviewDisplayType`,required:!0}},{key:`previewImageAnchoring`,value:{name:`AnchoringType`,required:!1}},{key:`buttonStyle`,value:{name:`RichTextButtonStyle`,required:!0}},{key:`hasBackground`,value:{name:`boolean`,required:!0}},{key:`backgroundColor`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_blockCard`,value:{name:`boolean`,required:!0}},{key:`borderWidth_blockCard`,value:{name:`string`,required:!0}},{key:`borderStyle_blockCard`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_blockCard`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_blockCard`,value:{name:`boolean`,required:!0}},{key:`radiusValue_blockCard`,value:{name:`string`,required:!0}},{key:`radiusChoice_blockCard`,value:{name:`Radius`,required:!0}},{key:`hasBackgroundTemplatePreview`,value:{name:`boolean`,required:!0}},{key:`backgroundColorTemplatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasBorder_templatePreview`,value:{name:`boolean`,required:!0}},{key:`borderWidth_templatePreview`,value:{name:`string`,required:!0}},{key:`borderStyle_templatePreview`,value:{name:`BorderStyle`,required:!0}},{key:`borderColor_templatePreview`,value:{name:`union`,raw:`Color | null`,elements:[{name:`signature`,type:`object`,raw:`{
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``}}}})))()}var Y,kt,At,jt,Mt,Nt,Pt,Ft;function It(){return(It=e((()=>{k(),A(),Y=n(),N(),ut(),H(),kt=e=>{let[t,n]=ce(e),[r,i]=(0,Y.useState)(null),[a,o]=(0,Y.useState)(``),[s,c]=(0,Y.useState)(0),[l,u]=(0,Y.useState)(!1),d=(0,Y.useRef)(!1),f=Oe(e),{blockAssets:p,deleteAssetIdsFromKey:m}=de(e),{blockTemplates:h,updateTemplateIdsFromKey:g,error:_}=C(e),{backgroundColor:v,borderColor_blockCard:y,borderStyle_blockCard:b,borderWidth_blockCard:x,description:S,hasBackground:ee,hasBorder_blockCard:w,hasCustomPaddingValue_blockCard:te,hasPageCount:ne,hasRadius_blockCard:re,paddingChoice_blockCard:ie,paddingValue_blockCard:ae,preview:oe,radiusChoice_blockCard:se,radiusValue_blockCard:le,textAnchoringHorizontal:T,textAnchoringVertical:ue,textPositioning:E,textRatio:fe,title:pe}=t,O=oe!==P.None,me=!O&&!ne&&!D(S),he=(0,Y.useCallback)(async t=>{if(!d.current){d.current=!0;try{await g(M,[t.template.id]),await n({title:j(De.heading3,t.template.title),description:j(De.p,t.template.description??void 0)}),c(s+1)}catch(e){o(e)}finally{d.current=!1,await e.dispatch(Ne())}}},[e,s,n,g]),ge=(0,Y.useCallback)(async e=>{await m(`previewCustom`,[e]),await n({preview:P.Template,altText:void 0})},[m,n]);return(0,Y.useEffect)(()=>{let t=e.subscribe(`templateChosen`,he);return()=>{typeof t==`function`&&t()}},[e,he]),(0,Y.useEffect)(()=>{_!==null&&o(_)},[_]),(0,Y.useEffect)(()=>{let e=h[M];if(!e||e.length===0)return;let t=e[e.length-1];t&&i(t)},[h]),(0,Y.useEffect)(()=>{let t=e.context(`isAuthenticated`).get();u(t)},[e]),{blockSettings:t,cardStyles:Ft(ee,v||U,te,ae,ie,re,le,se,w,x,b,y||W),contentClasses:At(O,E,ue),ctaClasses:jt(O,me,E,T),description:S,handleDeleteCustomPreview:ge,hasAuthenticatedUser:l,hasPreview:O,hasTitleOnly:me,isEditing:f,lastErrorMessage:a,preview:oe,previewClasses:Mt(O,E,fe),previewCustom:p.previewCustom?.length>0?p.previewCustom[0]:null,selectedTemplate:r,templateTextKey:s,textClasses:Nt(O,me,E,T),textCtaWrapperClasses:Pt(O,E,fe),title:pe,updateBlockSettings:n}},At=(e,t,n)=>{let r=e&&[F.Right,F.Left].includes(t)?tt[n]:``;return`tw-flex tw-gap-x-6 tw-gap-y-4 ${et[t]} ${r}`},jt=(e,t,n,r)=>t?`tw-self-center`:e&&[F.Top,F.Bottom].includes(n)?rt[r]:``,Mt=(e,t,n)=>`${e&&[F.Right,F.Left].includes(t)?at[n]:``} tw-w-full`,Nt=(e,t,n,r)=>`tw-grow ${e&&[F.Top,F.Bottom].includes(n)?nt[r]:`tw-text-left`} ${t?`tw-self-center tw-w-full @sm:tw-w-auto`:``}`,Pt=(e,t,n)=>`tw-flex tw-grow tw-gap-y-2 tw-gap-x-8 ${e?`tw-flex-col`:`tw-flex-col @sm:tw-flex-row`} ${e&&[F.Right,F.Left].includes(t)?it[n]:``}`,Ft=(e,t,n,r,i,a,o,s,c,l,u,d)=>({...e&&ye(t),padding:n?r:ct[i],borderRadius:a?o:ke[s],border:c?`${l} ${u} ${Ke(d)}`:`none`})})))()}var X,Lt;function Rt(){return(Rt=e((()=>{k(),c(),r(),Ae(),pt(),gt(),xt(),Et(),Ot(),It(),H(),X=t(),Lt=({appBridge:e})=>{let{blockSettings:t,cardStyles:n,contentClasses:r,ctaClasses:i,description:a,handleDeleteCustomPreview:o,hasAuthenticatedUser:s,hasPreview:c,hasTitleOnly:l,isEditing:u,lastErrorMessage:d,preview:f,previewClasses:p,previewCustom:m,selectedTemplate:h,templateTextKey:g,textClasses:_,textCtaWrapperClasses:v,title:y,updateBlockSettings:x}=kt(e),S=async()=>{if(!h)return;let{templateEditing:n}=t;if(n===V.Simple)open(h.creationFormUri,`_self`);else{let t=f===P.Custom&&m?m.previewUrl:h.previewUrl,n={template:{...h,previewUrl:t}};await e.dispatch(Ie(n))}},C=()=>e.dispatch(he());return!u&&(!h||!s)?(0,X.jsx)(`div`,{"data-test-id":`container`,className:ft.scope}):(0,X.jsx)(Ue,{scope:ft.scope,children:(0,X.jsx)(`div`,{"data-test-id":`container`,className:`tw-@container`,children:(0,X.jsxs)(`div`,{"data-test-id":`card`,style:n,children:[u&&d!==``&&(0,X.jsx)(ht,{errorMessage:d}),(0,X.jsxs)(`div`,{"data-test-id":`content`,className:r,children:[c&&(0,X.jsx)(Tt,{appBridge:e,blockSettings:t,template:h,previewCustom:m,previewClasses:p,updateBlockSettings:x,onOpenTemplateChooser:C,handleNewPublication:S,handleDeleteCustomPreview:o}),(0,X.jsxs)(`div`,{"data-test-id":`text-cta-wrapper`,className:v,children:[(0,X.jsx)(`div`,{"data-test-id":`text`,className:_,children:(0,X.jsx)(Dt,{appBridge:e,updateBlockSettings:x,title:y,description:a,pageCount:t.hasPageCount===!1?void 0:h?.pages.length??0,isEditing:u,hasTitleOnly:l,templateTextKey:g})}),(0,X.jsx)(`div`,{"data-test-id":`cta`,className:i,children:(0,X.jsx)(bt,{blockSettings:t,isEditing:u,isDisabled:!h,updateBlockSettings:x,handleNewPublication:S})})]})]}),u&&!c&&(0,X.jsxs)(`div`,{"data-test-id":`cta-editing-no-preview`,className:`tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-container-secondary tw-rounded-medium tw-flex-col @sm:tw-flex-row`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(b,{size:`large`,color:`weak`,children:`Connected template: `}),(0,X.jsx)(b,{size:`large`,children:h?.name??`None`})]}),(0,X.jsx)(_e,{className:`tw-line-clamp-2`,emphasis:h?`default`:`strong`,onPress:C,children:h?`Replace template`:`Choose existing template`})]})]})})})},Lt.__docgenInfo={description:``,methods:[],displayName:`TemplateBlock`}})))()}var zt;function Bt(){return(Bt=e((()=>{A(),ut(),Rt(),zt=Ge({block:Lt,settings:lt})})))()}var Vt,Z,Ht,Ut,Q,$,Wt,Gt,Kt,qt,Jt,Yt,Xt;function Zt(){return(Zt=e((()=>{fe(),Me(),Se(),N(),H(),Bt(),Vt={title:`Blocks/Template`,...ze(zt)},Z=T.image(0),Ht=T.image(5),Ut={...Be.with(7001),name:`Social media announcement`,description:`A 1080 × 1080 post with headline, image and logo lockup.`,previewUrl:Z.previewUrl,pages:[{previewUrl:Z.previewUrl,width:Z.width??0,height:Z.height??0},{previewUrl:Ht.previewUrl,width:Ht.width??0,height:Ht.height??0}]},Q=JSON.stringify([{type:`heading3`,children:[{text:`Social media announcement`}]}]),$=JSON.stringify([{type:`p`,children:[{text:`Start from the approved layout and swap in your own headline and photo.`}]}]),Wt={appBridge:{blockTemplates:{[M]:[Ut]}}},Gt={},Kt={args:{title:Q,description:$},parameters:Wt},qt={args:{title:Q,description:$,textPositioning:F.Bottom,hasPageCount:!0},parameters:Wt},Jt={args:{title:Q,description:$,preview:P.Custom},parameters:{appBridge:{blockTemplates:{[M]:[Ut]},blockAssets:{previewCustom:[T.image(3)]}}}},Yt={args:{title:Q,description:$,preview:P.None},parameters:Wt},Xt=[`Empty`,`WithTemplate`,`TextBelowWithPageCount`,`CustomPreview`,`WithoutPreview`]})))()}Zt();export{Jt as CustomPreview,Gt as Empty,qt as TextBelowWithPageCount,Kt as WithTemplate,Yt as WithoutPreview,Xt as __namedExportsOrder,Vt as default};