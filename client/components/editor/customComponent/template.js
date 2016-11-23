import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

const LoadingBlock =  CSSModules((parent) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }

    return (
    <div styleName="loading-preset">
        <div styleName="close" onClick={removeBlock}></div>
        <div styleName="play-icon video"></div>
        <div styleName="loader"></div>
    </div>
    )
},style, { allowMultiple: true });

const ErrorBlock =  CSSModules((parent) => {
    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }

    return (
    <div styleName="block">
        <div styleName="close" onClick={removeBlock}></div>
        <div styleName="loading-preset">
            <div styleName="play-icon error"></div>
            <p styleName="errorText">上傳發生錯誤，請重新上傳</p>
        </div>
    </div>
    )
},style, { allowMultiple: true });

const ProcessingBlock =  CSSModules((parent) => {

    return (
    <div styleName="block">
        <div styleName="loading-preset">
            <div styleName="play-icon process"></div>
            <p styleName="errorText">檔案仍在處理中</p>
        </div>
    </div>
    )
},style, { allowMultiple: true });

const ImgBlock = CSSModules(({parent, props}) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }

    return (
    <div styleName="block" style={{ 'textAlign': 'center'}}>
        { props.loading ? 
            <div styleName="mask-block loading"><div styleName="close" onClick={removeBlock}></div><img styleName="article-image" src={props.src} /><div styleName="loading"></div><div styleName="mask"></div></div> : 
            <div >
                <div styleName="close" onClick={removeBlock}></div>
                <img styleName="article-image"src={props.src} />
            </div>
        }		
    </div>
    )
},style, { allowMultiple: true });

const VideoBlock = CSSModules(({parent, props}) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }
    return (
    <div styleName="block">
    { props.loading? <div styleName="loading-preset"><div styleName="close" onClick={removeBlock}></div><div styleName="play-icon video"></div><div styleName="loader"></div></div> : 
        <div>
            <div styleName="close" onClick={removeBlock}></div>
            { typeof(props.convertstatus) !== 'undefined' ?
                <div styleName="loading-preset" style={{ background: 'url(' + props.src + ') no-repeat center '}}>
                    <div styleName="play-icon video"></div>
                    <img src={props.poster}/>
                </div>
                :
                <video controls src={props.src} />
            }
            
        </div>
    }
    </div>
    )
},style, { allowMultiple: true });

const AudioBlock = CSSModules(({parent, props}) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }

    return (
    <div styleName="block">
    { props.loading? <div styleName="loading-preset audio"><div styleName="close" onClick={removeBlock}></div><div styleName="play-icon audio"></div><div styleName="loader"></div></div> : 
        <div styleName="mid-block">
            <div styleName="close" onClick={removeBlock}></div>
            <div styleName="title">{props.name}</div>
            <audio controls src={props.src} />
        </div>
    }
    </div>
    )
},style, { allowMultiple: true });

const DocumentBlock = CSSModules(({parent, props}) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }

    return (
    <div styleName="block">
    { props.loading? <div styleName="loading-preset document"><div styleName="close" onClick={removeBlock}></div><div styleName="play-icon document"></div><div styleName="loader"></div></div> : 
        <div>
            <div styleName="close" onClick={removeBlock}></div> 
            <div styleName="loading-preset"  style={{ background: 'url(' + props.src + ') no-repeat center'}}>
                <div styleName="play-icon document"></div> 
                <div styleName="mid-title">{props.name}</div>
            </div>
        </div>
    }
    </div>
    )
},style, { allowMultiple: true });

const YoutubeBlock = CSSModules(({parent, props}) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }

    return (
    <div styleName="block">
        <div styleName="close" onClick={removeBlock}></div>
        <a href={props.url } target="_blank">{props.url}</a>
        <div>
        <iframe width="476" height="267.5"
            src={location.protocol + "//www.youtube.com/embed/" + props.file}>
            </iframe>
        </div>
    </div>
    )
},style, { allowMultiple: true });

const HyperLinkBlock = CSSModules(({parent, props}) => {

    const removeBlock = () => {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    }
    if(!props.img) props.img={};

    return (
    <div styleName="block">
        <div styleName="close" onClick={removeBlock}></div>
        <a href={props.linkurl } target="_blank">
        <span styleName="link">{props.linkurl}</span>
            <div styleName="linkBlock">
                <img src={props.src} />
                <div styleName="info">
                    <h3>{props.linktitle}</h3>
                    <p>{props.linkcontent}</p>
                    <span styleName="tag104">plus.104.com.tw</span>
                </div>
            </div>
        </a>
    </div>
    )
},style, { allowMultiple: true });

const LinkBlock = CSSModules(({parent, props}) => {

    return (
    <a href={props.url} target="_blank">
        {props.url}
    </a>
    )
},style, { allowMultiple: true });


export { ErrorBlock, ImgBlock, VideoBlock, AudioBlock, DocumentBlock, HyperLinkBlock, LinkBlock, YoutubeBlock, LoadingBlock };