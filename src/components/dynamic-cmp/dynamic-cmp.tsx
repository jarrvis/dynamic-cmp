import { Component, Prop, Element, Method,State } from '@stencil/core';

const COMPONENT_PROP_ATTR = 'component-prop-';

@Component({
    tag: 'dynamic-cmp',
    styleUrl: 'dynamic-cmp.css'
})
export class DynamicCmp {

    /**
     * Name of component to be lazy loaded 
     */
    @Prop() component?: string;

    /**
     * Props of component that will be lazy loaded
     */
    @Prop({mutable: true}) componentProps?: { [key: string]: any } = {};

    /**
     * Prop of component to be lazy loaded 
     */
    @Prop() 'component-prop-?'?: string;

    /**
     * Name of component to be lazy loaded 
     */
    @Prop() rendered: boolean = false;

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
