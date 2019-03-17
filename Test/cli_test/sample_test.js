// npm run test

const assert = require('assert');

describe('This is Sample Test', () => {

    it('Running first Sample test', () => {
        // make the sample test pass always.
        assert( 1+2 === 3 );
    });

    it('Running second Sample test', () => {
        // to make the test to fail, evaluate the expression false.
        // Say 1+1 === 3
        assert( 1+2 === 3 );
    });

    it('Running third Sample test', () => {
        // make the sample test pass always.
        assert( 1+2 === 3 );
    });
});

