import{n as e,r as t}from"./rolldown-runtime-C0FnF6B9.js";import{t as n}from"./react-IpA8Qn9U.js";import{n as r}from"./iframe-Cfa2O3XD.js";import{Hr as i,Jn as a,Kr as o,Lr as s,Mt as c,Rr as l,Wr as u,Xr as d,Yr as f,_ as p,a as m,br as h,bt as g,c as _,cn as v,i as y,in as b,jt as x,n as S,o as C,qn as w,r as T,ri as ee,rn as te,s as ne,sn as re,t as ie,ti as ae,v as oe,xt as se,yr as ce}from"./StyleProvider-B7868Obs.js";import{B as le,C as E,G as ue,Gt as de,H as fe,Ht as D,I as pe,J as me,K as O,Kt as he,L as ge,R as _e,S as ve,U as ye,V as be,Vt as xe,W as Se,Y as Ce,_ as we,q as Te,t as Ee,z as De}from"./helpers.es-DfjKHYkN.js";import{p as Oe,t as ke}from"./BlockItemWrapper.es-CUX0UiwW.js";import{n as Ae}from"./toRgbaString.es-CeoayZf7.js";import{n as je}from"./getBackgroundColorStyles.es-CyBTPaqh.js";import{a as Me,c as Ne,i as k,t as Pe}from"./types.es-CXpHWNfM.js";import{a as Fe,i as Ie,n as Le}from"./border.es-CTTLYVkJ.js";import{t as A}from"./hasRichTextValue.es-BRfuSM7o.js";import{n as Re}from"./convertToRichTextValue.es-BmsTS-lT.js";import{n as ze,t as Be}from"./merge.es-U-w69n1D.js";import{t as j}from"./constants.es-k8JHI1Hx.js";import{n as Ve}from"./defaultPluginsWithLinkChooser.es-eI8RpILt.js";import{n as He}from"./background.es-BWUGk8pA.js";import{t as Ue}from"./notification.es-BjXNTZ02.js";import{a as We,i as Ge,n as Ke,o as qe,r as Je,t as Ye}from"./presetCustomValue.es-LpTSp2Lg.js";import{n as Xe,t as Ze}from"./maximumNumericalOrPixelOrAutoRule.es-CO0y4bft.js";import{n as Qe}from"./minimumNumericalOrPixelOrAutoRule.es-Cg8fUaMa.js";import{r as $e}from"./borderRadius.es-CzT9xuYW.js";import{n as et,r as tt,t as M}from"./index.es-BBNxvj_g.js";import{i as nt,l as rt,n as it,r as at,s as ot,t as st}from"./useImageContainer-BZ56pkJQ.js";var ct,lt;function ut(){return(ut=e((()=>{Ie(),Me(),We(),Ze(),Ge(),Ke(),ct=e=>({id:e,type:`segmentedControls`,defaultValue:k.Small,choices:[{value:k.None,label:`None`},{value:k.Small,label:`S`},{value:k.Medium,label:`M`},{value:k.Large,label:`L`}]}),lt=e=>{let t=e?.id?`hasCustomPaddingValue_${e?.id}`:`hasCustomPaddingValue`,n=e?.id?`paddingValue_${e?.id}`:`paddingValue`,r=e?.id?`paddingChoice_${e?.id}`:`paddingChoice`;return{id:t,label:`Padding`,type:`switch`,switchLabel:`Custom`,defaultValue:!1,info:`The spacing around UI elements to create more negative space`,onChange:t=>Ye(t,r,n,e?.paddingStyleMap||Pe),on:[{id:n,type:`input`,placeholder:Fe,rules:[Je,Xe(500)],onChange:e=>qe(e,n)}],off:[ct(r)]}}})))()}var N;function dt(){return(dt=e((()=>{N=`template`})))()}var P,F,I,L,R,ft,pt,mt,ht,gt,_t,vt,z,yt,bt,xt,B;function V(){return(V=e((()=>{M(),P=function(e){return e.None=`none`,e.Template=`template`,e.Custom=`custom`,e}({}),F=function(e){return e.Bottom=`bottom`,e.Top=`top`,e.Right=`right`,e.Left=`left`,e}({}),I=function(e){return e.Start=`start`,e.Center=`center`,e.End=`end`,e}({}),L=function(e){return e.OneQuarter=`25`,e.OneThird=`33.3333`,e.OneHalf=`50`,e.TwoThirds=`66.6666`,e.ThreeQuarters=`75`,e}({}),R=function(e){return e.Auto=`auto`,e.Small=`small`,e.Medium=`medium`,e.Large=`large`,e}({}),ft={bottom:`tw-flex-col`,top:`tw-flex-col-reverse`,right:`tw-flex-col @sm:tw-flex-row`,left:`tw-flex-col-reverse @sm:tw-flex-row-reverse`},pt={start:`lg:tw-items-start`,center:`lg:tw-items-center`,end:`lg:tw-items-end`},mt={start:`lg:tw-text-left`,center:`lg:tw-text-center`,end:`lg:tw-text-right`},ht={start:`lg:tw-self-start`,center:`lg:tw-self-center`,end:`lg:tw-self-end`},gt={25:`lg:tw-basis-1/4`,"33.3333":`lg:tw-basis-1/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-2/3`,75:`lg:tw-basis-3/4`},_t={25:`lg:tw-basis-3/4`,"33.3333":`lg:tw-basis-2/3`,50:`lg:tw-basis-1/2`,"66.6666":`lg:tw-basis-1/3`,75:`lg:tw-basis-1/4`},vt={auto:`auto`,small:`240px`,medium:`480px`,large:`640px`},z=function(e){return e.Fit=`fit`,e.Fill=`fill`,e}({}),yt={fit:`tw-object-contain`,fill:`tw-object-cover`},bt={start:`left`,center:`center`,end:`right`},xt={[k.None]:`0px`,[k.Small]:`10px`,[k.Medium]:`20px`,[k.Large]:`30px`},B=function(e){return e.Simple=`simple`,e.Advanced=`advanced`,e}({})})))()}var H,U,St;function Ct(){return(Ct=e((()=>{f(),M(),dt(),V(),H={red:255,green:255,blue:255,alpha:0},U={red:234,green:235,blue:235,alpha:1},St=tt({main:[],basics:[{id:N,type:`templateInput`,label:`Template`,showForTranslations:!0},{id:`hasPageCount`,type:`switch`,defaultValue:!1,label:`Show page count`,info:`Show or hide the page count indicator`},{id:`preview`,type:`slider`,label:`Preview`,choices:[{label:`Template`,value:P.Template},{label:`Custom`,value:P.Custom},{label:`None`,value:P.None}],defaultValue:P.Template,showForTranslations:!0},{id:`previewCustom`,type:`assetInput`,size:`small`,extensions:s.Images,label:`Custom Preview`,show:e=>e.getBlock(`preview`)?.value===P.Custom,showForTranslations:!0},{id:`templateEditingHeading`,type:`sectionHeading`,blocks:[{id:`templateEditing`,label:`Template editing`,info:`Choose how users can make changes to the template.`,type:`slider`,choices:[{label:`Simple`,value:B.Simple},{label:`Advanced`,value:B.Advanced}],defaultValue:B.Advanced,showForTranslations:!0},{id:`templateEditingNotificationSimple`,type:`notification`,text:`Users can only make changes by selecting and editing fields in the settings panel without approvals.`,show:e=>e.getBlock(`templateEditing`)?.value===B.Simple,styles:{type:Ue.Info},showForTranslations:!0},{id:`templateEditingNotificationAdvanced`,type:`notification`,text:`Users can select layers and edit text directly.`,show:e=>e.getBlock(`templateEditing`)?.value===B.Advanced,styles:{type:Ue.Info},showForTranslations:!0}]}],layout:[{id:`cardLayoutHeading`,type:`sectionHeading`,label:`Card`,blocks:[lt({id:`blockCard`,paddingStyleMap:xt})]},{id:`textLayoutHeading`,type:`sectionHeading`,label:`Text`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{id:`textPositioning`,label:`Positioning`,type:`slider`,defaultValue:F.Right,info:`Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.`,choices:[{value:F.Bottom,icon:`MediaObjectTextBottom`},{value:F.Top,icon:`MediaObjectTextTop`},{value:F.Right,icon:`MediaObjectTextRight`},{value:F.Left,icon:`MediaObjectTextLeft`}]},{id:`textRatio`,label:`Ratio`,type:`slider`,defaultValue:L.OneHalf,info:`The text to image width ratio. Some settings won't apply if the container is too narrow.`,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Right||t===F.Left},choices:[{value:L.OneQuarter,icon:`MediaObjectRatio3To1`},{value:L.OneThird,icon:`MediaObjectRatio2To1`},{value:L.OneHalf,icon:`MediaObjectRatio1To1`},{value:L.TwoThirds,icon:`MediaObjectRatio1To2`},{value:L.ThreeQuarters,icon:`MediaObjectRatio1To3`}]},{id:`textAnchoringVertical`,type:`slider`,label:`Vertical alignment`,defaultValue:I.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Right||t===F.Left},choices:[{value:I.Start,icon:`ArrowAlignUp`},{value:I.Center,icon:`ArrowAlignHorizontalCentre`},{value:I.End,icon:`ArrowAlignDown`}]},{id:`textAnchoringHorizontal`,type:`slider`,label:`Horizontal alignment`,defaultValue:I.Start,show:e=>{let t=e.getBlock(`textPositioning`)?.value;return t===F.Top||t===F.Bottom},choices:[{value:I.Start,icon:`ArrowAlignLeft`},{value:I.Center,icon:`ArrowAlignVerticalCentre`},{value:I.End,icon:`ArrowAlignRight`}]}]},{id:`previewLayoutHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{id:`isPreviewHeightCustom`,type:`switch`,label:`Height`,switchLabel:`Custom`,info:`Determines the preview height.`,defaultValue:!1,onChange:e=>{Ye(e,`previewHeightSimple`,`previewHeightCustom`,vt)},on:[{id:`previewHeightCustom`,type:`input`,placeholder:`e.g. 50px`,clearable:!0,rules:[Je,Qe(10)],onChange:e=>{qe(e,`previewHeightCustom`)}}],off:[{id:`previewHeightSimple`,type:`slider`,defaultValue:R.Auto,choices:[{value:R.Auto,label:`Auto`},{value:R.Small,label:`S`},{value:R.Medium,label:`M`},{value:R.Large,label:`L`}]}]},{id:`previewDisplay`,type:`slider`,label:`Display`,defaultValue:z.Fit,show:e=>e.getBlock(`previewHeightSimple`)?.value!==R.Auto,choices:[{value:z.Fit,label:`Fit`},{value:z.Fill,label:`Fill`}]},{id:`previewImageAnchoring`,type:`slider`,label:`Image anchoring`,defaultValue:I.Center,show:e=>e.getBlock(`previewHeightSimple`)?.value!==R.Auto&&e.getBlock(`previewDisplay`)?.value===z.Fit,choices:[{value:I.Start,icon:`ArrowAlignLeft`},{value:I.Center,icon:`ArrowAlignVerticalCentre`},{value:I.End,icon:`ArrowAlignRight`}]}]}],style:[{id:`buttonStyleHeading`,type:`sectionHeading`,label:`Button`,blocks:[{id:`buttonStyle`,type:`dropdown`,size:`small`,defaultValue:`primary`,label:`Style`,choices:[{label:`Primary`,value:`primary`},{label:`Secondary`,value:`secondary`},{label:`Tertiary`,value:`tertiary`}]}]},{id:`cardStyleHeading`,type:`sectionHeading`,label:`Card`,blocks:[{...He({defaultValue:!0,defaultColor:H})},{...Le({id:`blockCard`,defaultValue:!0,defaultColor:U})},{...$e({id:`blockCard`}),show:e=>e.getBlock(`hasBackground`)?.value===!0||e.getBlock(`hasBorder_blockCard`)?.value===!0,onChange:e=>e.setBlockValue(`radiusValue_blockCard`,Ne[e.getBlock(`radiusChoice_blockCard`)?.value])}]},{id:`previewStyleHeading`,type:`sectionHeading`,label:`Preview`,show:e=>e.getBlock(`preview`)?.value!==P.None,blocks:[{...He({id:`TemplatePreview`,defaultValue:!0,defaultColor:H})},{...Le({id:`templatePreview`,defaultValue:!0,defaultColor:U})},{...$e({id:`templatePreview`}),onChange:e=>e.setBlockValue(`radiusValue_templatePreview`,Ne[e.getBlock(`radiusChoice_templatePreview`)?.value])}]}]})})))()}var wt,Tt;function Et(){return(Et=e((()=>{wt=`template-block`,Tt={scope:wt}})))()}var Dt,Ot;function kt(){return(kt=e((()=>{w(),Dt=r(),Ot=({errorMessage:e})=>(0,Dt.jsxs)(`span`,{"aria-live":`polite`,className:`tw-p-5 tw-flex tw-gap-4 tw-mb-4 tw-items-center tw-rounded-sm tw-transition-opacity tw-ease-in-out tw-bg-container-error tw-text-container-error-on-error-container`,children:[(0,Dt.jsx)(`span`,{children:(0,Dt.jsx)(a,{size:16})}),e]}),Ot.__docgenInfo={description:``,methods:[],displayName:`AlertError`,props:{errorMessage:{required:!0,tsType:{name:`string`},description:``}}}})))()}var At,jt,Mt,Nt;function Pt(){return(Pt=e((()=>{Ce(),M(),At=n(),V(),jt=r(),Mt=new me({noToolbar:!0}).setPlugin(),Nt=({blockSettings:e,isEditing:t,isDisabled:n,updateBlockSettings:r,handleNewPublication:i})=>{let[a,o]=(0,At.useState)(!1),{buttonText:s,preview:c,buttonStyle:l}=e,u=(0,At.useCallback)(e=>r({buttonText:e}),[r]),d=c===P.None?`!tw-m-0`:`!tw-mb-0`,f=(()=>{switch(l){case`primary`:return E.buttonPrimary;case`secondary`:return E.buttonSecondary;case`tertiary`:return E.buttonTertiary;default:return E.buttonPrimary}})();return(0,jt.jsx)(`button`,{type:`button`,"data-test-id":`cta-button`,disabled:n,onClick:t?void 0:i,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),className:`disabled:tw-opacity-50 ${d} [&>div]:!tw-@container-normal tw-max-w-full`,style:{...f,...a?f?.hover:null},children:(0,jt.jsx)(we,{value:A(s)?s:Re(`p`,`Use this Template`),isEditing:t,plugins:Mt,onTextChange:u})})},Nt.__docgenInfo={description:``,methods:[],displayName:`CtaButton`,props:{blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var Ft,W,It;function Lt(){return(Lt=e((()=>{f(),h(),b(),x(),Be(),M(),rt(),nt(),st(),Ft=n(),V(),W=r(),It=({appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:a,onOpenTemplateChooser:o,handleDeleteCustomPreview:s})=>{let l=i(e),{preview:u,previewImageAnchoring:d,previewDisplay:f}=t,p=u===P.Custom&&r,m=p?r:n&&{previewUrl:n.previewUrl,genericUrl:n.previewUrl,originUrl:n.previewUrl,extension:``,width:null,height:null},{containerWidth:h,setContainerRef:g}=it(),_=t.altText??`Template preview`,v=ze([`tw-relative tw-w-full tw-h-full`,yt[f]]),y={objectPosition:d?bt[d]:`center`},[b,x]=(0,Ft.useState)(!1),[S,C]=(0,Ft.useState)(t.altText),[w,T]=(0,Ft.useState)(!1);return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`span`,{ref:g,className:`tw-block tw-w-full tw-h-full`,onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),children:m&&(0,W.jsx)(at,{image:m,containerWidth:h,alt:_,className:v,style:y,testId:`preview-img`})}),l&&(0,W.jsx)(`div`,{className:`tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3`,children:(0,W.jsx)(ke,{shouldBeShown:w||b,toolbarItems:[{type:`menu`,items:(()=>{let e=[{title:`Set alt text`,onClick:()=>x(!0),icon:(0,W.jsx)(te,{size:20})},{title:`Replace template`,onClick:o,icon:(0,W.jsx)(ce,{size:16})}];return p&&e.push({title:`Delete custom preview`,onClick:()=>s(r.id),style:`danger`,icon:(0,W.jsx)(c,{size:16})}),[e]})()}],children:(0,W.jsx)(ot,{setShowAltTextMenu:x,showAltTextMenu:b,setLocalAltText:C,defaultAltText:t.altText,onSave:()=>a({altText:S||void 0}),localAltText:S})})})]})},It.__docgenInfo={description:``,methods:[],displayName:`PreviewImage`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var G,Rt;function zt(){return(zt=e((()=>{f(),re(),M(),Ct(),V(),Lt(),G=r(),Rt=({appBridge:e,blockSettings:t,template:n,previewCustom:r,previewClasses:a,updateBlockSettings:o,onOpenTemplateChooser:s,handleNewPublication:c,handleDeleteCustomPreview:l})=>{let u=i(e),{backgroundColorTemplatePreview:d,borderColor_templatePreview:f,borderStyle_templatePreview:p,borderWidth_templatePreview:m,hasBackgroundTemplatePreview:h,hasBorder_templatePreview:g,hasRadius_templatePreview:_,isPreviewHeightCustom:y,previewHeightCustom:b,previewHeightSimple:x,radiusChoice_templatePreview:S,radiusValue_templatePreview:C}=t,w=_?C:Ne[S],T=g?`${m} ${p} ${Ae(f||U)}`:`none`,ee=y?b:vt[x],te=!u&&n!==null;return(0,G.jsx)(`div`,{className:a,"data-test-id":`preview`,children:n!==null||r?(0,G.jsx)(`button`,{type:`button`,className:`tw-relative tw-overflow-hidden tw-w-full tw-h-full`,"data-test-id":`preview-wrapper`,style:{...h&&{...je(d||H)},borderRadius:w,border:T,height:ee},onClick:c,disabled:!te,"aria-label":`Use this template`,children:(0,G.jsx)(It,{appBridge:e,blockSettings:t,template:n,previewCustom:r,updateBlockSettings:o,onOpenTemplateChooser:s,handleDeleteCustomPreview:l})}):(0,G.jsx)(`div`,{style:{height:vt[R.Small]},children:(0,G.jsx)(Oe,{label:`Choose existing template`,icon:(0,G.jsx)(v,{}),withMenu:!1,fillParentContainer:!0,onClick:s})})})},Rt.__docgenInfo={description:``,methods:[],displayName:`TemplatePreview`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},blockSettings:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``},onOpenTemplateChooser:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleNewPublication:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},handleDeleteCustomPreview:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(assetId: number) => void`,signature:{arguments:[{type:{name:`number`},name:`assetId`}],return:{name:`void`}}},description:``}}}})))()}var K,q,Bt;function Vt(){return(Vt=e((()=>{he(),D(),be(),Ce(),Te(),Se(),ge(),fe(),De(),M(),K=n(),q=r(),Bt=({appBridge:e,updateBlockSettings:t,title:n,description:r,pageCount:i,isEditing:a,hasTitleOnly:o,templateTextKey:s})=>{let c=E[ve.imageCaption],l=i===1?`page`:`pages`,u=(0,K.useCallback)(async e=>{n!==e&&await t({title:e})},[n,t]),d=(0,K.useCallback)(async e=>{r!==e&&await t({description:e})},[r,t]),f=(0,K.useMemo)(()=>new me().setPlugin([new ue,new ye({textStyles:Ee})]).setPlugin([new xe,new le,new _e,new pe]).setPlugin([new O,new de]),[]),p=(0,K.useMemo)(()=>Ve(e),[e]),m=(0,K.useMemo)(()=>(0,q.jsx)(we,{value:n??Re(ve.heading3),placeholder:`Add a title`,onTextChange:u,isEditing:a,showSerializedText:A(n),plugins:f},s),[f,a,u,n,s]),h=(0,K.useMemo)(()=>(0,q.jsx)(we,{value:r,placeholder:`Add a description for your template`,onTextChange:d,showSerializedText:A(r),isEditing:a,plugins:p},s),[p,r,a,d,s]);return(0,q.jsxs)(`div`,{children:[(0,q.jsx)(`div`,{"data-test-id":`title`,style:(()=>{let e={[`${j}heading1-margin-top`]:`0`,[`${j}heading2-margin-top`]:`0`,[`${j}heading3-margin-top`]:`0`,[`${j}heading4-margin-top`]:`0`,[`${j}custom1-margin-top`]:`0`,[`${j}custom2-margin-top`]:`0`,[`${j}custom3-margin-top`]:`0`,[`${j}body-margin-top`]:`0`,[`${j}quote-margin-top`]:`0`},t={[`${j}heading1-margin-bottom`]:`0`,[`${j}heading2-margin-bottom`]:`0`,[`${j}heading3-margin-bottom`]:`0`,[`${j}heading4-margin-bottom`]:`0`,[`${j}custom1-margin-bottom`]:`0`,[`${j}custom2-margin-bottom`]:`0`,[`${j}custom3-margin-bottom`]:`0`,[`${j}body-margin-bottom`]:`0`,[`${j}quote-margin-bottom`]:`0`};return o?{...e,...t}:e})(),children:m}),i!==void 0&&(0,q.jsx)(`div`,{className:`tw-mb-2`,"data-test-id":`page-count`,children:(0,q.jsx)(`span`,{style:{...c},children:`${i} ${l}`})}),(0,q.jsx)(`div`,{className:a||A(r)?`tw-mt-2`:``,"data-test-id":`description`,children:h})]})},Bt.__docgenInfo={description:``,methods:[],displayName:`TemplateText`,props:{appBridge:{required:!0,tsType:{name:`AppBridgeBlock`},description:``},title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},pageCount:{required:!0,tsType:{name:`union`,raw:`number | undefined`,elements:[{name:`number`},{name:`undefined`}]},description:``},isEditing:{required:!0,tsType:{name:`boolean`},description:``},hasTitleOnly:{required:!0,tsType:{name:`boolean`},description:``},templateTextKey:{required:!0,tsType:{name:`number`},description:``},updateBlockSettings:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(newSettings: Partial<Settings>) => Promise<void>`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`red`,value:{name:`number`,required:!0}},{key:`green`,value:{name:`number`,required:!0}},{key:`blue`,value:{name:`number`,required:!0}},{key:`alpha`,value:{name:`number`,required:!1}},{key:`name`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!0}},{key:`hasRadius_templatePreview`,value:{name:`boolean`,required:!0}},{key:`radiusValue_templatePreview`,value:{name:`string`,required:!0}},{key:`radiusChoice_templatePreview`,value:{name:`Radius`,required:!0}}]}}],raw:`Partial<Settings>`},name:`newSettings`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``}}}})))()}var J,Ht,Ut,Wt,Gt,Kt,qt,Jt;function Yt(){return(Yt=e((()=>{f(),M(),J=n(),dt(),Ct(),V(),Ht=e=>{let[t,n]=d(e),[r,a]=(0,J.useState)(null),[o,s]=(0,J.useState)(``),[c,u]=(0,J.useState)(0),[f,p]=(0,J.useState)(!1),m=(0,J.useRef)(!1),h=i(e),{blockAssets:g,deleteAssetIdsFromKey:_}=ae(e),{blockTemplates:v,updateTemplateIdsFromKey:y,error:b}=ee(e),{backgroundColor:x,borderColor_blockCard:S,borderStyle_blockCard:C,borderWidth_blockCard:w,description:T,hasBackground:te,hasBorder_blockCard:ne,hasCustomPaddingValue_blockCard:re,hasPageCount:ie,hasRadius_blockCard:oe,paddingChoice_blockCard:se,paddingValue_blockCard:ce,preview:le,radiusChoice_blockCard:E,radiusValue_blockCard:ue,textAnchoringHorizontal:de,textAnchoringVertical:fe,textPositioning:D,textRatio:pe,title:me}=t,O=le!==P.None,he=!O&&!ie&&!A(T),ge=(0,J.useCallback)(async t=>{if(!m.current){m.current=!0;try{await y(N,[t.template.id]),await n({title:Re(ve.heading3,t.template.title),description:Re(ve.p,t.template.description??void 0)}),u(c+1)}catch(e){s(e)}finally{m.current=!1,await e.dispatch(l())}}},[e,c,n,y]),_e=(0,J.useCallback)(async e=>{await _(`previewCustom`,[e]),await n({preview:P.Template,altText:void 0})},[_,n]);return(0,J.useEffect)(()=>{let t=e.subscribe(`templateChosen`,ge);return()=>{typeof t==`function`&&t()}},[e,ge]),(0,J.useEffect)(()=>{b!==null&&s(b)},[b]),(0,J.useEffect)(()=>{let e=v[N];if(!e||e.length===0)return;let t=e[e.length-1];t&&a(t)},[v]),(0,J.useEffect)(()=>{let t=e.context(`isAuthenticated`).get();p(t)},[e]),{blockSettings:t,cardStyles:Jt(te,x||H,re,ce,se,oe,ue,E,ne,w,C,S||U),contentClasses:Ut(O,D,fe),ctaClasses:Wt(O,he,D,de),description:T,handleDeleteCustomPreview:_e,hasAuthenticatedUser:f,hasPreview:O,hasTitleOnly:he,isEditing:h,lastErrorMessage:o,preview:le,previewClasses:Gt(O,D,pe),previewCustom:g.previewCustom?.length>0?g.previewCustom[0]:null,selectedTemplate:r,templateTextKey:c,textClasses:Kt(O,he,D,de),textCtaWrapperClasses:qt(O,D,pe),title:me,updateBlockSettings:n}},Ut=(e,t,n)=>{let r=e&&[F.Right,F.Left].includes(t)?pt[n]:``;return`tw-flex tw-gap-x-6 tw-gap-y-4 ${ft[t]} ${r}`},Wt=(e,t,n,r)=>t?`tw-self-center`:e&&[F.Top,F.Bottom].includes(n)?ht[r]:``,Gt=(e,t,n)=>`${e&&[F.Right,F.Left].includes(t)?_t[n]:``} tw-w-full`,Kt=(e,t,n,r)=>`tw-grow ${e&&[F.Top,F.Bottom].includes(n)?mt[r]:`tw-text-left`} ${t?`tw-self-center tw-w-full @sm:tw-w-auto`:``}`,qt=(e,t,n)=>`tw-flex tw-grow tw-gap-y-2 tw-gap-x-8 ${e?`tw-flex-col`:`tw-flex-col @sm:tw-flex-row`} ${e&&[F.Right,F.Left].includes(t)?gt[n]:``}`,Jt=(e,t,n,r,i,a,o,s,c,l,u,d)=>({...e&&je(t),padding:n?r:xt[i],borderRadius:a?o:Ne[s],border:c?`${l} ${u} ${Ae(d)}`:`none`})})))()}var Y,Xt;function Zt(){return(Zt=e((()=>{f(),p(),g(),S(),Et(),kt(),Pt(),zt(),Vt(),Yt(),V(),Y=r(),Xt=({appBridge:e})=>{let{blockSettings:t,cardStyles:n,contentClasses:r,ctaClasses:i,description:a,handleDeleteCustomPreview:s,hasAuthenticatedUser:c,hasPreview:l,hasTitleOnly:d,isEditing:f,lastErrorMessage:p,preview:m,previewClasses:h,previewCustom:g,selectedTemplate:_,templateTextKey:v,textClasses:y,textCtaWrapperClasses:b,title:x,updateBlockSettings:S}=Ht(e),C=async()=>{if(!_)return;let{templateEditing:n}=t;if(n===B.Simple)open(_.creationFormUri,`_self`);else{let t=m===P.Custom&&g?g.previewUrl:_.previewUrl,n={template:{..._,previewUrl:t}};await e.dispatch(o(n))}},w=()=>e.dispatch(u());return!f&&(!_||!c)?(0,Y.jsx)(`div`,{"data-test-id":`container`,className:Tt.scope}):(0,Y.jsx)(ie,{scope:Tt.scope,children:(0,Y.jsx)(`div`,{"data-test-id":`container`,className:`tw-@container`,children:(0,Y.jsxs)(`div`,{"data-test-id":`card`,style:n,children:[f&&p!==``&&(0,Y.jsx)(Ot,{errorMessage:p}),(0,Y.jsxs)(`div`,{"data-test-id":`content`,className:r,children:[l&&(0,Y.jsx)(Rt,{appBridge:e,blockSettings:t,template:_,previewCustom:g,previewClasses:h,updateBlockSettings:S,onOpenTemplateChooser:w,handleNewPublication:C,handleDeleteCustomPreview:s}),(0,Y.jsxs)(`div`,{"data-test-id":`text-cta-wrapper`,className:b,children:[(0,Y.jsx)(`div`,{"data-test-id":`text`,className:y,children:(0,Y.jsx)(Bt,{appBridge:e,updateBlockSettings:S,title:x,description:a,pageCount:t.hasPageCount===!1?void 0:_?.pages.length??0,isEditing:f,hasTitleOnly:d,templateTextKey:v})}),(0,Y.jsx)(`div`,{"data-test-id":`cta`,className:i,children:(0,Y.jsx)(Nt,{blockSettings:t,isEditing:f,isDisabled:!_,updateBlockSettings:S,handleNewPublication:C})})]})]}),f&&!l&&(0,Y.jsxs)(`div`,{"data-test-id":`cta-editing-no-preview`,className:`tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-container-secondary tw-rounded-medium tw-flex-col @sm:tw-flex-row`,children:[(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(oe,{size:`large`,color:`weak`,children:`Connected template: `}),(0,Y.jsx)(oe,{size:`large`,children:_?.name??`None`})]}),(0,Y.jsx)(se,{className:`tw-line-clamp-2`,emphasis:_?`default`:`strong`,onPress:w,children:_?`Replace template`:`Choose existing template`})]})]})})})},Xt.__docgenInfo={description:``,methods:[],displayName:`TemplateBlock`}})))()}var Qt;function $t(){return($t=e((()=>{M(),Ct(),Zt(),Qt=et({block:Xt,settings:St})})))()}var en=t({CustomPreview:()=>cn,Empty:()=>an,TextBelowWithPageCount:()=>sn,WithTemplate:()=>on,WithoutPreview:()=>ln,__namedExportsOrder:()=>un,default:()=>tn}),tn,X,nn,rn,Z,Q,$,an,on,sn,cn,ln,un;function dn(){return(dn=e((()=>{_(),C(),y(),dt(),V(),$t(),tn={title:`Blocks/Template`,...T(Qt)},X=m.image(0),nn=m.image(5),rn={...ne.with(7001),name:`Social media announcement`,description:`A 1080 × 1080 post with headline, image and logo lockup.`,previewUrl:X.previewUrl,pages:[{previewUrl:X.previewUrl,width:X.width??0,height:X.height??0},{previewUrl:nn.previewUrl,width:nn.width??0,height:nn.height??0}]},Z=JSON.stringify([{type:`heading3`,children:[{text:`Social media announcement`}]}]),Q=JSON.stringify([{type:`p`,children:[{text:`Start from the approved layout and swap in your own headline and photo.`}]}]),$={appBridge:{blockTemplates:{[N]:[rn]}}},an={},on={args:{title:Z,description:Q},parameters:$},sn={args:{title:Z,description:Q,textPositioning:F.Bottom,hasPageCount:!0},parameters:$},cn={args:{title:Z,description:Q,preview:P.Custom},parameters:{appBridge:{blockTemplates:{[N]:[rn]},blockAssets:{previewCustom:[m.image(3)]}}}},ln={args:{title:Z,description:Q,preview:P.None},parameters:$},un=[`Empty`,`WithTemplate`,`TextBelowWithPageCount`,`CustomPreview`,`WithoutPreview`]})))()}export{dn as n,ut as r,en as t};