import { Component, Prop, Element, Method } from '@stencil/core';

const COMPONENT_PROP_ATTR = 'component-prop-';

@Component({
    tag: 'dynamic-cmp'
})
export class DynamicCmp {

    /**
     * Name of component to be loaded/unloaded 
     */
    @Prop() component?: string;

    /**
     * Props of component that will be loaded/unloaded
     */
    @Prop({mutable: true}) componentProps?: { [key: string]: any } = {};

    /**
     * Prop of component to be loaded/unloaded 
     */
    @Prop() 'component-prop-?'?: string;

    /**
     * Decides whether component is loaded at first or not 
     */
    @Prop({mutable: true}) rendered: boolean = false;

    @Element() el;

    componentWillLoad() {
        [...this.el.attributes]
            .filter(attr => attr.name.startsWith(COMPONENT_PROP_ATTR))
            .map(prop => {
                const name = prop.name.replace(COMPONENT_PROP_ATTR, '');
                this.componentProps[name] = prop.value
            })
    }

    @Method()
    load() {
        if (this.component) {
            this.rendered = true;
        }
    }

    
    @Method()
    unload() {
        if (this.component) {
            this.rendered = false;
        }
    }

    render() {
        if(this.rendered) {
            return (
              <this.component {...this.componentProps}/>
            );
        }
    }
}
