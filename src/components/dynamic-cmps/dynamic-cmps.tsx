import { Component, Method, State } from '@stencil/core';

@Component({
    tag: 'dynamic-cmps',
})
export class DynamicCmps {

    @State() components = []
    
    @Method()
    add(component: string, componentProps?: {[key: string]: any} ) {
        this.components.push({component: component, componentProps: componentProps})
    }

    render() {
        return [
            this.components.map(cmp => (
                <cmp.component {...cmp.componentProps}/>
            ))
        ];
    }
}
