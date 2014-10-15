/* jshint tabwidth:2 */

'use strict';

var updateTotals,
		toCurrency,
		vat = 0.2;

$(function() {

	// Update item total on input change
	$( '.basket-quantity' ).on( 'change keyup', function( e )
	{

		var regex     = /[^\d]/g,
				$input    = $( this ),
				$controls = $( $input.data( 'controls' ) ),
				$remove   = $( $input.data( 'remove' ) ),
				quantity  = $input.val(),
				totalValue;

		// Remove non numeric characters
		quantity = quantity.replace( regex, '' );
		$input.val( quantity );

		// Validation and enable/disable buttons
		if( quantity <= 0 )
		{
			quantity = 0;
			$input.val( 0 );
			$controls.children( '.qty-decrease' ).prop( 'disabled', true );
			$controls.children( '.qty-increase' ).prop( 'disabled', false );
			$remove.prop( 'disabled', true );
		}
		else if( quantity >= 10 )
		{
			quantity = 10;
			$input.val( 10 );

			$controls.children( '.qty-decrease' ).prop( 'disabled', false );
			$controls.children( '.qty-increase' ).prop( 'disabled', true );
			$remove.prop( 'disabled', false );
		}
		else{
			$controls.children( '.qty-decrease' ).prop( 'disabled', false );
			$controls.children( '.qty-increase' ).prop( 'disabled', false );
			$remove.prop( 'disabled', false );
		}

		// Quantity * price, fixed to two decimal places
		totalValue  = toCurrency( quantity * $input.data( 'price' ) );

		$( $input.data( 'total' ) ).html( totalValue );

		updateTotals();

	} );



	//Update item quantities when spinbuttons are clicked
	$( '.qty-control button' ).on( 'click', function( e )
	{
		e.preventDefault();

		var $button   = $( this ),
				$quantity = $( $button.data( 'quantity' ) );

		if( $button.hasClass( 'qty-increase' ) )
		{
			$quantity.val( Number( $quantity.val() ) + 1 );
		}
		else if( $button.hasClass( 'qty-decrease' ) )
		{
			$quantity.val( Number( $quantity.val() ) - 1 );
		}

		$quantity.trigger( 'change' );

	} );



	//Remove item from basket
	$( '.basket-remove' ).on( 'click', function( e )
	{
		e.preventDefault();

		var $button   = $( this ),
				$quantity = $( $button.data( 'quantity' ) );

		$quantity.val( 0 );

		$quantity.trigger( 'change' );

	} );



	// Send ajax data
	$( '#button-buy' ).on( 'click', function( e )
	{
		e.preventDefault();

		var formData = $( '.basket-form').serialize(),
				totals   = $( '.item-total var, #subtotal, #vat, #total' );

		totals.each( function()
		{
			formData += '&' + encodeURIComponent( this.id ) + '=' + encodeURIComponent( $( this ).html() );
		} );

		$.ajax(
		{
			url      : '',
			data     : formData,
			complete : function( xhr )
			{
				alert( 'Ajax complete \n\n' + formData.replace( /&/g, '\n' ) );
			}
		})

	} );



	// Initialise totals for browsers that pre-populate values on reload
	$( '.basket-quantity' ).trigger( 'change' );



	// Overlay control - not for productiion
	$( '.overlay-control').on( 'click', function()
	{
		$( '.overlay' ).toggle();
	} );

});

updateTotals = function()
{
	var $itemTotals = $( '.item-total var' ),
			$subtotal   = $( '.subtotal var' ),
			$vat        = $( '.vat var' ),
			$total      = $( '.total var' ),
			subtotal    = 0,
			vatTotal    = 0,
			total       = 0;

	// Add item totals
	$itemTotals.each( function()
	{
		subtotal += Number( $( this ).html() );
	} );

	$subtotal.html( toCurrency( subtotal ) );

	// Calculate VAT
	vatTotal = subtotal * vat;
	$vat.html( toCurrency( vatTotal ) );

	// Calculate grand total
	total = subtotal + vatTotal;
	$total.html( toCurrency( total ) );

	// Enable/disable submit button
	if( total > 0 )
	{
		$( '#button-buy').prop( 'disabled', false );
	}
	else
	{
		$( '#button-buy').prop( 'disabled', true );
	}

}

// Convert number to currency format n.nn
toCurrency = function( float )
{
	return Number( float ).toFixed( 2 );
}