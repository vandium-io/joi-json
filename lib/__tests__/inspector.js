
class SchemaInspector {

    constructor( schema ) {

        this.schema = schema;
    }

    rule( name ) {

        for( let r of this.rules() ) {

            if( r.name === name ) {

                return r;
            }
        }

        throw new Error( `Rule ${name} not found in schema` );
    }

    rules() {

        return this.schema._rules;
    }

    ids() {

        return this.schema._ids._byKey;
    }

    id( name ) {

        const value = this.ids().get( name );

        if( !value ) {

            throw new Error( `unknown id: ${name}` );
        }

        return value;
    }

    dump( log = console.log ) {

        log( `type ${this.schema.type}` );
        log( 'rules: [');
        this.rules().forEach( (r) => {

            log( r );
        });
        log( ']' );

        if( this.ids() ) {

            log( 'ids: [' );
            for( let [key,value] of this.ids() ) {

                log( key +':' );
                log( value );
            }
            log( ']' );
        }
    }
}

module.exports = SchemaInspector;
