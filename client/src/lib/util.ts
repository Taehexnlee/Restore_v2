import type { PaymentSummary, ShippingAddress } from "../app/model/order"

export function currencyFormat(amount : number) {
    return '$' + (amount/100).toFixed(2)
}
export function filterEmptyValues(values: object) {
    return Object.fromEntries(
        Object.entries(values).filter(
            ([ , value]) => value !== '' && value !== null
                && value !== undefined && value.length !== 0
        )
    )
}
export const formatAddressString = (address: ShippingAddress) => {

    return `${address?.name} , ${address?.line1}, ${address?.city}, ${address?.state} , ${address?.postal_code} , ${address?.country}`
  }

 export const formatPaymentString = (card : PaymentSummary) => {
    return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, 
            Exp: ${card?.exp_month}/${card?.exp_year}`
  }

export const safeRegexTest = (pattern: RegExp, value: string | null | undefined): boolean => {
    if (typeof value !== 'string') return false;
    return pattern.test(value);
}

export const getStripeClientSecretFromSearch = (search: string | null | undefined): string | null => {
    if (typeof search !== 'string' || search.trim() === '') return null;
    const normalized = search.startsWith('?') ? search : `?${search}`;
    const params = new URLSearchParams(normalized);
    const clientSecret = params.get('payment_intent_client_secret');
    return safeRegexTest(/^pi_/, clientSecret) ? clientSecret : null;
}
