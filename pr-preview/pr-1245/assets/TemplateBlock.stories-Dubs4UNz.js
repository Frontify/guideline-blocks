import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{n as t,r as n}from"./iframe-CDyFemi9.js";import{$i as r,$r as i,Ar as a,At as o,Bt as s,C as c,E as l,Et as u,Ft as d,Ht as f,I as p,It as m,J as h,Li as g,Lt as _,Mt as v,Nt as y,Pt as b,Qi as x,Ri as S,Rt as C,St as w,T,Tr as ee,Ut as E,Vt as te,Wt as ne,_n as re,a as D,ai as ie,an as ae,bi as oe,bn as O,br as se,c as k,ct as ce,d as le,da as ue,dr as A,ei as de,fa as fe,g as pe,gn as me,ha as he,i as ge,ia as _e,in as ve,j as ye,jt as be,kr as xe,kt as Se,l as Ce,li as we,mr as Te,n as Ee,na as De,ni as Oe,o as ke,oa as Ae,oi as je,on as Me,ot as Ne,pt as Pe,q as Fe,r as Ie,s as Le,sn as Re,sr as ze,t as Be,ti as Ve,u as j,ua as M,ui as He,wn as Ue,yi as We,yn as Ge,zt as Ke}from"./StyleProvider-BZRDz-Ip.js";import{i as qe,l as Je,n as Ye,r as Xe,s as Ze,t as Qe}from"./useImageContainer-C1vkJUj_.js";var N;function $e(){return($e=e((()=>{N=`template`})))()}var P,F,I,L,R,et,tt,nt,rt,it,at,ot,z,st,ct,lt,B;function V(){return(V=e((()=>{j(),P=function(e){return e.None=`none`,e.Template=`template`,e.Custom=`custom`,e}({}),F=function(e){return e.Bottom=`bottom`,e.Top=`top`,e.Right=`right`,e.Left=`left`,e}({}),I=function(e){return e.Start=`start`,e.Center=`center`,e.End=`end`,e}({}),L=function(e){return e.OneQuarter=`25`,e.OneThird=`33.3333`,e.OneHalf=`50`,e.TwoThirds=`66.6666`,e.ThreeQuarters=`75`,e}({}),R=function(e){return e.Auto=`auto`,e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e}({}),et={bottom:`tw-flex-col`,top:`tw-flex-col-reverse`,right:`tw-flex-col @sm:tw-flex-row`,left:`tw-flex-col-reverse @sm:tw-flex-row-reverse`},tt={start:`lg:tw-items-start`,center:`lg:tw-items-center`,end:`lg:tw-items-end`},nt={start:`lg:tw-text-left`,center:`lg:tw-text-center`,end:`lg:tw-text-right`},rt={start:`lg:tw-self-start`,center:`lg:tw-self-center`,end:`lg:tw-self-end`},it={25:`lg:tw-basis-1/4`,"33.3333":`lg:tw-basis-1/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-2/3`,75:`lg:tw-basis-3/4`},at={25:`lg:tw-basis-3/4`,"33.3333":`lg:tw-basis-2/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-1/3`,75:`lg:tw-basis-1/4`},ot={auto:`auto`,small:`240px`,medium:`480px`,large:`640px`},z=function(e){return e.Fit=`fit`,e.Fill=`fill`,e}({}),st={fit:`tw-object-contain`,fill:`tw-object-cover`},ct={start:`left`,center:`center`,end:`right`},lt={[ze.None]:`0px`,[ze.Small]:`10px`,[ze.Medium]:`20px`,[ze.Large]:`30px`},B=function(e){return e.Simple=`simple`,e.Advanced=`advanced`,e}({})})))()}var H,U,ut;function dt(){return(dt=e((()=>{M(),j(),$e(),V(),H={red:255,green:255,blue:255,alpha:0},U={red:234,green:235,blue:235,alpha:1},ut=le({main:[],basics:[{id:N,type:`templateInput`,label:`Template`,showForTranslations:!0},{id:`hasPageCount`,type:`switch`,defaultValue:!1,label:`Show page count`,info:`Show or hide the page count indicator`},{id:`preview`,type:`slider`,label:`Preview`,choices:[{label:`Template`,value:P.Template},{label:`Custom`,value:P.Custom},{label:`None`,value:P.None}],defaultValue:P.Template,showForTranslations:!0},{id:`previewCustom`,type:`assetInput`,size:`small`,extensions:r.Images,label:`Custom Preview`,show:e=>e.getBlock(`preview`)?.value===P.Custom,showForTranslations:!0},{id:`templateEditingHeading`,type:`sectionHeading`,blocks:[{id:`templateEditing`,label:`Template editing`,info:`Choose how users can make changes to the template.`,type:`slider`,choices:[{label:`Simple`,value:B.Simple},{label:`Advanced`,value:B.Advanced}],defaultValue:B.Advanced,showForTranslations:!0},{id:`templateEditingNotificationSimple`,type:`notification`,text:`Users can only make changes by selecting and editing fields in the settings panel without approvals.`,show:e=>e.getBlock(`templateEditing`)?.value===B.Simple,styles:{type:h.Info},showForTranslations:!0},{id:`templateEditingNotificationAdvanced`,type:`notification`,text:`Users can select layers and edit text directly.`,show:e=>e.getBlock(`templateEditing`)?.value===B.Advanced,styles:{type:h.Info},showForTranslations:!0}]}],layout:[{id:`cardLayoutHeading`,type:`sectionHeading`,label:`Card`,blocks:[pe({id:`blockCard`,paddingStyleMap:lt})]},{id:`textLayoutHeading`,type:`sectionHeading`,label:`Text`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{id:`textPositioning`,label:`Positioning`,type:`slider`,defaultValue:F.Right,info:`Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.`,choices:[{value:F.Bottom,icon:`MediaObjectTextBottom`},{value:F.Top,icon:`MediaObjectTextTop`},{value:F.Right,icon:`MediaObjectTextRight`},{value:F.Left,icon:`MediaObjectTextLeft`}]},{id:`textRatio`,label:`Ratio`,type:`slider`,defaultValue:L.OneHalf,info:`The text to image width ratio. Some settings won't apply if the container is too narrow.`,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Right||t===F.Left},choices:[{value:L.OneQuarter,icon:`MediaObjectRatio3To1`},{value:L.OneThird,icon:`MediaObjectRatio2To1`},{value:L.OneHalf,icon:`MediaObjectRatio1To1`},{value:L.TwoThirds,icon:`MediaObjectRatio1To2`},{value:L.ThreeQuarters,icon:`MediaObjectRatio1To3`}]},{id:`textAnchoringVertical`,type:`slider`,label:`Vertical alignment`,defaultValue:I.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Right||t===F.Left},choices:[{value:I.Start,icon:`ArrowAlignUp`},{value:I.Center,icon:`ArrowAlignHorizontalCentre`},{value:I.End,icon:`ArrowAlignDown`}]},{id:`textAnchoringHorizontal`,type:`slider`,label:`Horizontal alignment`,defaultValue:I.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Top||t===F.Bottom},choices:[{value:I.Start,icon:`ArrowAlignLeft`},{value:I.Center,icon:`ArrowAlignVerticalCentre`},{value:I.End,icon:`ArrowAlignRight`}]}]},{id:`previewLayoutHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{id:`isPreviewHeightCustom`,type:`switch`,label:`Height`,switchLabel:`Custom`,info:`Determines the preview height.`,defaultValue:!1,onChange:e=>{l(e,`previewHeightSimple`,`previewHeightCustom`,ot)},on:[{id:`previewHeightCustom`,type:`input`,placeholder:`e.g. 50px`,clearable:!0,rules:[p,ye(10)],onChange:e=>{Fe(e,`previewHeightCustom`)}}],off:[{id:`previewHeightSimple`,type:`slider`,defaultValue:R.Auto,choices:[{value:R.Auto,label:`Auto`},{value:R.Small,label:`S`},{value:R.Medium,label:`M`},{value:R.Large,label:`L`}]}]},{id:`previewDisplay`,type:`slider`,label:`Display`,defaultValue:z.Fit,show:e=>e.getBlock(`previewHeightSimple`)?.value!==R.Auto,choices:[{value:z.Fit,label:`Fit`},{value:z.Fill,label:`Fill`}]},{id:`previewImageAnchoring`,type:`slider`,label:`Image anchoring`,defaultValue:I.Center,show:e=>e.getBlock(`previewHeightSimple`)?.value!==R.Auto&&e.getBlock(`previewDisplay`)?.value===z.Fit,choices:[{value:I.Start,icon:`ArrowAlignLeft`},{value:I.Center,icon:`ArrowAlignVerticalCentre`},{value:I.End,icon:`ArrowAlignRight`}]}]}],style:[{id:`buttonStyleHeading`,type:`sectionHeading`,label:`Button`,blocks:[{id:`buttonStyle`,type:`dropdown`,size:`small`,defaultValue:`primary`,label:`Style`,choices:[{label:`Primary`,value:`primary`},{label:`Secondary`,value:`secondary`},{label:`Tertiary`,value:`tertiary`}]}]},{id:`cardStyleHeading`,type:`sectionHeading`,label:`Card`,blocks:[{...Ne({defaultValue:!0,defaultColor:H})},{...T({id:`blockCard`,defaultValue:!0,defaultColor:U})},{...c({id:`blockCard`}),show:e=>e.getBlock(`hasBackground`)?.value===!0||e.getBlock(`hasBorder_blockCard`)?.value===!0,onChange:e=>e.setBlockValue(`radiusValue_blockCard`,A[e.getBlock(`radiusChoice_blockCard`)?.value])}]},{id:`previewStyleHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{...Ne({id:`TemplatePreview`,defaultValue:!0,defaultColor:H})},{...T({id:`templatePreview`,defaultValue:!0,defaultColor:U})},{...c({id:`templatePreview`}),onChange:e=>e.setBlockValue(`radiusValue_templatePreview`,A[e.getBlock(`radiusChoice_templatePreview`)?.value])}]}]})})))()}var ft,pt;function mt(){return(mt=e((()=>{ft=`template-block`,pt={scope:ft}})))()}var W,ht;function gt(){return(gt=e((()=>{We(),W=t(),ht=({errorMessage:e})=>(0,W.jsxs)(`span`,{"aria-live":`polite`,className:`tw-p-5 tw-flex tw-gap-4 tw-mb-4 tw-items-center tw-rounded-sm tw-transition-opacity tw-ease-in-out tw-bg-container-error tw-text-container-error-on-error-container`,children:[(0,W.jsx)(`span`,{children:(0,W.jsx)(oe,{size:16})}),e]}),ht.__docgenInfo={description:``,methods:[],displayName:`AlertError`,props:{errorMessage:{required:!0,tsType:{name:`string`},description:``}}}})))()}var _t,vt,yt,bt;function xt(){return(xt=e((()=>{ne(),j(),_t=n(),V(),vt=t(),yt=new E({noToolbar:!0}).setPlugin(),bt=({blockSettings:e,isEditing:t,isDisabled:n,updateBlockSettings:r,handleNewPublication:i})=>{let[a,s]=(0,_t.useState)(!1),{buttonText:c,preview:l,buttonStyle:u}=e,d=(0,_t.useCallback)(e=>r({buttonText:e}),[r]),f=l===P.None?`!tw-m-0`:`!tw-mb-0`,p=(()=>{switch(u){case`primary`:return o.buttonPrimary;case`secondary`:return o.buttonSecondary;case`tertiary`:return o.buttonTertiary;default:return o.buttonPrimary}})();return(0,vt.jsx)(`button`,{type:`button`,"data-test-id":`cta-button`,disabled:n,onClick:t?void 0:i,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),className:`disabled:tw-opacity-50 ${f} [&>div]:!tw-@container-normal tw-max-w-full`,style:{...p,...a?p?.hover:null},children:(0,vt.jsx)(w,{value:O(c)?c:Ge(`p`,`Use this Template`),isEditing:t,plugins:yt,onTextChange:d})})},bt.__docgenInfo={description:``,methods:[],displayName:`CtaButton`,props:{blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var St,G,Ct;function wt(){return(wt=e((()=>{M(),S(),je(),Ve(),me(),j(),Je(),qe(),Qe(),St=n(),V(),G=t(),Ct=({appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:i,onOpenTemplateChooser:a,handleDeleteCustomPreview:o})=>{let s=x(e),{preview:c,previewImageAnchoring:l,previewDisplay:u}=t,d=c===P.Custom&&r,f=d?r:n&&{previewUrl:n.previewUrl,genericUrl:n.previewUrl,originUrl:n.previewUrl,extension:``,width:null,height:null},{containerWidth:p,setContainerRef:m}=Ye(),h=t.altText??`Template preview`,_=re([`tw-relative tw-w-full tw-h-full`,st[u]]),v={objectPosition:l?ct[l]:`center`},[y,b]=(0,St.useState)(!1),[S,C]=(0,St.useState)(t.altText),[w,T]=(0,St.useState)(!1);return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{ref:m,className:`tw-block tw-w-full tw-h-full`,onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),children:f&&(0,G.jsx)(Xe,{image:f,containerWidth:p,alt:h,className:_,style:v,testId:`preview-img`})}),s&&(0,G.jsx)(`div`,{className:`tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3`,children:(0,G.jsx)(Ue,{shouldBeShown:w||y,toolbarItems:[{type:`menu`,items:(()=>{let e=[{title:`Set alt text`,onClick:()=>b(!0),icon:(0,G.jsx)(ie,{size:20})},{title:`Replace template`,onClick:a,icon:(0,G.jsx)(g,{size:16})}];return d&&e.push({title:`Delete custom preview`,onClick:()=>o(r.id),style:`danger`,icon:(0,G.jsx)(Oe,{size:16})}),[e]})()}],children:(0,G.jsx)(Ze,{setShowAltTextMenu:b,showAltTextMenu:y,setLocalAltText:C,defaultAltText:t.altText,onSave:()=>i({altText:S||void 0}),localAltText:S})})})]})},Ct.__docgenInfo={description:``,methods:[],displayName:`PreviewImage`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var K,Tt;function Et(){return(Et=e((()=>{M(),we(),j(),dt(),V(),wt(),K=t(),Tt=({appBridge:e,blockSettings:t,template:n,previewCustom:r,previewClasses:i,updateBlockSettings:a,onOpenTemplateChooser:o,handleNewPublication:s,handleDeleteCustomPreview:c})=>{let l=x(e),{backgroundColorTemplatePreview:u,borderColor_templatePreview:d,borderStyle_templatePreview:f,borderWidth_templatePreview:p,hasBackgroundTemplatePreview:m,hasBorder_templatePreview:h,hasRadius_templatePreview:g,isPreviewHeightCustom:_,previewHeightCustom:v,previewHeightSimple:y,radiusChoice_templatePreview:b,radiusValue_templatePreview:S}=t,C=g?S:A[b],w=h?`${p} ${f} ${se(d||U)}`:`none`,T=_?v:ot[y],E=!l&&n!==null;return(0,K.jsx)(`div`,{className:i,"data-test-id":`preview`,children:n!==null||r?(0,K.jsx)(`button`,{type:`button`,className:`tw-relative tw-overflow-hidden tw-w-full tw-h-full`,"data-test-id":`preview-wrapper`,style:{...m&&{...Te(u||H)},borderRadius:C,border:w,height:T},onClick:s,disabled:!E,"aria-label":`Use this template`,children:(0,K.jsx)(Ct,{appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:a,onOpenTemplateChooser:o,handleDeleteCustomPreview:c})}):(0,K.jsx)(`div`,{style:{height:ot[R.Small]},children:(0,K.jsx)(ee,{label:`Choose existing template`,icon:(0,K.jsx)(He,{}),withMenu:!1,fillParentContainer:!0,onClick:o})})})},Tt.__docgenInfo={description:``,methods:[],displayName:`TemplatePreview`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var q,J,Dt;function Ot(){return(Ot=e((()=>{Re(),ae(),m(),ne(),f(),Ke(),v(),_(),b(),j(),q=n(),J=t(),Dt=({appBridge:e,updateBlockSettings:t,title:n,description:r,pageCount:i,isEditing:a,hasTitleOnly:c,templateTextKey:l})=>{let f=o[Se.imageCaption],p=i===1?`page`:`pages`,m=(0,q.useCallback)(async e=>{n!==e&&await t({title:e})},[n,t]),h=(0,q.useCallback)(async e=>{r!==e&&await t({description:e})},[r,t]),g=(0,q.useMemo)(()=>new E().setPlugin([new s,new C({textStyles:Pe})]).setPlugin([new ve,new d,new y,new be]).setPlugin([new te,new Me]),[]),_=(0,q.useMemo)(()=>ce(e),[e]),v=(0,q.useMemo)(()=>(0,J.jsx)(w,{value:n??Ge(Se.heading3),placeholder:`Add a title`,onTextChange:m,isEditing:a,showSerializedText:O(n),plugins:g},l),[g,a,m,n,l]),b=(0,q.useMemo)(()=>(0,J.jsx)(w,{value:r,placeholder:`Add a description for your template`,onTextChange:h,showSerializedText:O(r),isEditing:a,plugins:_},l),[_,r,a,h,l]);return(0,J.jsxs)(`div`,{children:[(0,J.jsx)(`div`,{"data-test-id":`title`,style:(()=>{let e={[`${u}heading1-margin-top`]:`0`,[`${u}heading2-margin-top`]:`0`,[`${u}heading3-margin-top`]:`0`,[`${u}heading4-margin-top`]:`0`,[`${u}custom1-margin-top`]:`0`,[`${u}custom2-margin-top`]:`0`,[`${u}custom3-margin-top`]:`0`,[`${u}body-margin-top`]:`0`,[`${u}quote-margin-top`]:`0`},t={[`${u}heading1-margin-bottom`]:`0`,[`${u}heading2-margin-bottom`]:`0`,[`${u}heading3-margin-bottom`]:`0`,[`${u}heading4-margin-bottom`]:`0`,[`${u}custom1-margin-bottom`]:`0`,[`${u}custom2-margin-bottom`]:`0`,[`${u}custom3-margin-bottom`]:`0`,[`${u}body-margin-bottom`]:`0`,[`${u}quote-margin-bottom`]:`0`};return c?{...e,...t}:e})(),children:v}),i!==void 0&&(0,J.jsx)(`div`,{className:`tw-mb-2`,"data-test-id":`page-count`,children:(0,J.jsx)(`span`,{style:{...f},children:`${i} ${p}`})}),(0,J.jsx)(`div`,{className:a||O(r)?`tw-mt-2`:``,"data-test-id":`description`,children:b})]})},Dt.__docgenInfo={description:``,methods:[],displayName:`TemplateText`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},pageCount:{required:!0,tsType:{name:`union`,raw:`number | undefined`,elements:[{name:`number`},{name:`undefined`}]},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},hasTitleOnly:{required:!0,tsType:{name:`boolean`},description:``},templateTextKey:{required:!0,tsType:{name:`number`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``}}}})))()}var Y,kt,At,jt,Mt,Nt,Pt,Ft;function It(){return(It=e((()=>{M(),j(),Y=n(),$e(),dt(),V(),kt=e=>{let[t,n]=ue(e),[r,i]=(0,Y.useState)(null),[a,o]=(0,Y.useState)(``),[s,c]=(0,Y.useState)(0),[l,u]=(0,Y.useState)(!1),d=(0,Y.useRef)(!1),f=x(e),{blockAssets:p,deleteAssetIdsFromKey:m}=he(e),{blockTemplates:h,updateTemplateIdsFromKey:g,error:_}=_e(e),{backgroundColor:v,borderColor_blockCard:y,borderStyle_blockCard:b,borderWidth_blockCard:S,description:C,hasBackground:w,hasBorder_blockCard:T,hasCustomPaddingValue_blockCard:ee,hasPageCount:E,hasRadius_blockCard:te,paddingChoice_blockCard:ne,paddingValue_blockCard:re,preview:D,radiusChoice_blockCard:ie,radiusValue_blockCard:ae,textAnchoringHorizontal:oe,textAnchoringVertical:se,textPositioning:k,textRatio:ce,title:le}=t,A=D!==P.None,de=!A&&!E&&!O(C),fe=(0,Y.useCallback)(async t=>{if(!d.current){d.current=!0;try{await g(N,[t.template.id]),await n({title:Ge(Se.heading3,t.template.title),description:Ge(Se.p,t.template.description??void 0)}),c(s+1)}catch(e){o(e)}finally{d.current=!1,await e.dispatch(De())}}},[e,s,n,g]),pe=(0,Y.useCallback)(async e=>{await m(`previewCustom`,[e]),await n({preview:P.Template,altText:void 0})},[m,n]);return(0,Y.useEffect)(()=>{let t=e.subscribe(`templateChosen`,fe);return()=>{typeof t==`function`&&t()}},[e,fe]),(0,Y.useEffect)(()=>{_!==null&&o(_)},[_]),(0,Y.useEffect)(()=>{let e=h[N];if(!e||e.length===0)return;let t=e[e.length-1];t&&i(t)},[h]),(0,Y.useEffect)(()=>{let t=e.context(`isAuthenticated`).get();u(t)},[e]),{blockSettings:t,cardStyles:Ft(w,v||H,ee,re,ne,te,ae,ie,T,S,b,y||U),contentClasses:At(A,k,se),ctaClasses:jt(A,de,k,oe),description:C,handleDeleteCustomPreview:pe,hasAuthenticatedUser:l,hasPreview:A,hasTitleOnly:de,isEditing:f,lastErrorMessage:a,preview:D,previewClasses:Mt(A,k,ce),previewCustom:p.previewCustom?.length>0?p.previewCustom[0]:null,selectedTemplate:r,templateTextKey:s,textClasses:Nt(A,de,k,oe),textCtaWrapperClasses:Pt(A,k,ce),title:le,updateBlockSettings:n}},At=(e,t,n)=>{let r=e&&[F.Right,F.Left].includes(t)?tt[n]:``;return`tw-flex tw-gap-x-6 tw-gap-y-4 ${et[t]} ${r}`},jt=(e,t,n,r)=>t?`tw-self-center`:e&&[F.Top,F.Bottom].includes(n)?rt[r]:``,Mt=(e,t,n)=>`${e&&[F.Right,F.Left].includes(t)?at[n]:``} tw-w-full`,Nt=(e,t,n,r)=>`tw-grow ${e&&[F.Top,F.Bottom].includes(n)?nt[r]:`tw-text-left`} ${t?`tw-self-center tw-w-full @sm:tw-w-auto`:``}`,Pt=(e,t,n)=>`tw-flex tw-grow tw-gap-y-2 tw-gap-x-8 ${e?`tw-flex-col`:`tw-flex-col @sm:tw-flex-row`} ${e&&[F.Right,F.Left].includes(t)?it[n]:``}`,Ft=(e,t,n,r,i,a,o,s,c,l,u,d)=>({...e&&Te(t),padding:n?r:lt[i],borderRadius:a?o:A[s],border:c?`${l} ${u} ${se(d)}`:`none`})})))()}var X,Lt;function Rt(){return(Rt=e((()=>{M(),xe(),i(),Ee(),mt(),gt(),xt(),Et(),Ot(),It(),V(),X=t(),Lt=({appBridge:e})=>{let{blockSettings:t,cardStyles:n,contentClasses:r,ctaClasses:i,description:o,handleDeleteCustomPreview:s,hasAuthenticatedUser:c,hasPreview:l,hasTitleOnly:u,isEditing:d,lastErrorMessage:f,preview:p,previewClasses:m,previewCustom:h,selectedTemplate:g,templateTextKey:_,textClasses:v,textCtaWrapperClasses:y,title:b,updateBlockSettings:x}=kt(e),S=async()=>{if(!g)return;let{templateEditing:n}=t;if(n===B.Simple)open(g.creationFormUri,`_self`);else{let t=p===P.Custom&&h?h.previewUrl:g.previewUrl,n={template:{...g,previewUrl:t}};await e.dispatch(fe(n))}},C=()=>e.dispatch(Ae());return!d&&(!g||!c)?(0,X.jsx)(`div`,{"data-test-id":`container`,className:pt.scope}):(0,X.jsx)(Be,{scope:pt.scope,children:(0,X.jsx)(`div`,{"data-test-id":`container`,className:`tw-@container`,children:(0,X.jsxs)(`div`,{"data-test-id":`card`,style:n,children:[d&&f!==``&&(0,X.jsx)(ht,{errorMessage:f}),(0,X.jsxs)(`div`,{"data-test-id":`content`,className:r,children:[l&&(0,X.jsx)(Tt,{appBridge:e,blockSettings:t,template:g,previewCustom:h,previewClasses:m,updateBlockSettings:x,onOpenTemplateChooser:C,handleNewPublication:S,handleDeleteCustomPreview:s}),(0,X.jsxs)(`div`,{"data-test-id":`text-cta-wrapper`,className:y,children:[(0,X.jsx)(`div`,{"data-test-id":`text`,className:v,children:(0,X.jsx)(Dt,{appBridge:e,updateBlockSettings:x,title:b,description:o,pageCount:t.hasPageCount===!1?void 0:g?.pages.length??0,isEditing:d,hasTitleOnly:u,templateTextKey:_})}),(0,X.jsx)(`div`,{"data-test-id":`cta`,className:i,children:(0,X.jsx)(bt,{blockSettings:t,isEditing:d,isDisabled:!g,updateBlockSettings:x,handleNewPublication:S})})]})]}),d&&!l&&(0,X.jsxs)(`div`,{"data-test-id":`cta-editing-no-preview`,className:`tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-container-secondary tw-rounded-medium tw-flex-col @sm:tw-flex-row`,children:[(0,X.jsxs)(`div`,{children:[(0,X.jsx)(a,{size:`large`,color:`weak`,children:`Connected template: `}),(0,X.jsx)(a,{size:`large`,children:g?.name??`None`})]}),(0,X.jsx)(de,{className:`tw-line-clamp-2`,emphasis:g?`default`:`strong`,onPress:C,children:g?`Replace template`:`Choose existing template`})]})]})})})},Lt.__docgenInfo={description:``,methods:[],displayName:`TemplateBlock`}})))()}var zt;function Bt(){return(Bt=e((()=>{j(),dt(),Rt(),zt=Ce({block:Lt,settings:ut})})))()}var Vt,Z,Ht,Ut,Q,$,Wt,Gt,Kt,qt,Jt,Yt,Xt;function Zt(){return(Zt=e((()=>{Le(),ke(),ge(),$e(),V(),Bt(),Vt={title:`Blocks/Template`,...Ie(zt)},Z=D.image(0),Ht=D.image(5),Ut={...k.with(7001),name:`Social media announcement`,description:`A 1080 × 1080 post with headline, image and logo lockup.`,previewUrl:Z.previewUrl,pages:[{previewUrl:Z.previewUrl,width:Z.width??0,height:Z.height??0},{previewUrl:Ht.previewUrl,width:Ht.width??0,height:Ht.height??0}]},Q=JSON.stringify([{type:`heading3`,children:[{text:`Social media announcement`}]}]),$=JSON.stringify([{type:`p`,children:[{text:`Start from the approved layout and swap in your own headline and photo.`}]}]),Wt={appBridge:{blockTemplates:{[N]:[Ut]}}},Gt={},Kt={args:{title:Q,description:$},parameters:Wt},qt={args:{title:Q,description:$,textPositioning:F.Bottom,hasPageCount:!0},parameters:Wt},Jt={args:{title:Q,description:$,preview:P.Custom},parameters:{appBridge:{blockTemplates:{[N]:[Ut]},blockAssets:{previewCustom:[D.image(3)]}}}},Yt={args:{title:Q,description:$,preview:P.None},parameters:Wt},Xt=[`Empty`,`WithTemplate`,`TextBelowWithPageCount`,`CustomPreview`,`WithoutPreview`]})))()}Zt();export{Jt as CustomPreview,Gt as Empty,qt as TextBelowWithPageCount,Kt as WithTemplate,Yt as WithoutPreview,Xt as __namedExportsOrder,Vt as default};