import { Component } from 'react';
import './styles.css'

export class Button extends Component{
 
    render() {
        const { text, loadMorePosts, disabled } = this.props
        return ( 
          <button 
            className="btn" 
            disabled={disabled} 
            onClick={loadMorePosts}
        >{text}</button> 
        )   
    }
}