export class Response {
    statusCode: string;
    statusMessage: string;
}

export class LoginRequest {
    email: string;
    password: string;
}

export class LoginResponse extends Response {
    data: Students;
}

export class Students {
    id: string;
    student_id: string;
    card_no: string;
    pin: string;
    gender: string;
    dob: Date;
    first_name: string;
    last_name: string;
    phone: string;
    school: string;
    course: string;
    level: string;
    matric_number: string;
    email: string;
    address: string;
    progress: string;
    password: string;
    photo: string;
    access_start_time: Date;
    access_end_time: Date;
    security_deposit: string;
    access: string;
    emailverify: string;
    registration_completed: string;
    customerId: number;
    walletNumber: number;
    walletNumber2: string;
    room_number: string;
    location: string;
    token: string;
    token_expiration: string;
    modified: Date;
    created: Date;
    transaction_pin: number;
    terms: string;
}

export class RegisterRequest {
    username: string;
    password: string;
    customerType: string;
    dob: Date;
    email: string;
    phone: string;
    firstName: string;
    middleName: string;
    lastName: string;
    street: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
    businessName: string;
    businessRegNumber: string;
}

export class RegisterResponse extends Response {
    customerId: number;
}

export class CardContext {
    cardId: number;
    customerId: number;
    cardNumber: number;
    cardName: string;
    cardType: string;
    expiryDate: string;
    cvv: string;
    dateCreated: Date;
    status: number;
    token: string;
}

export class ListCardResponse extends Response {
    cards: CardContext[];
}

export class TransactionContext {
    sourceAccountType: string;
    destinationAccountType: string;
    destinationBank: string;
    sourceCurrency: string;
    destinationCurrency: string;
    transactionType: string;
    transactionId: number;
    referenceNumber: string;
    sourceAccountNumber: string;
    sourceCustomerId: number;
    sourceAccountName: string;
    sourceAccountTypeId: number;
    destinationCustomerId: number;
    destinationAccountNumber: string;
    destinationAccountName: string;
    destinationAccountTypeId: number;
    destinationBankId: number;
    transactionAmount: number;
    sourceCurrencyId: number;
    sourceNarration: string;
    destinationNarration: string;
    exchangeRate: number;
    dateSubmitted: Date;
    transactionDate: Date;
    valueDate: Date;
    statusCode: string;
    statusMessage: string;
    transactionReference: string;
    transactionTypeId: number;
    isReversal: boolean;
}

export class TransactionResponse extends Response {
    transactions: TransactionContext[];
}

export class WalletContext {
    id: number;
    student_id: string;
    wallet_code: string;
    description: string;
    vendor_id: string;
    channel: string;
    credit_transactionid: string;
    debit_ordernumber: string;
    credit: number;
    debit: number;
    balance: number;
    created: Date;
}

export class AddWalletRequst {
    customerId: number;
    description: string;
    walletType: string;
}

export class walletResponse extends Response {
    wallets: WalletContext[];
}

export class FundWalletRequest {
    walletNumber: number;
    amount: number;
    useCard: boolean;
    card: Card;
    account: BankAccount;
}

export class Card {
    cardId: number;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    pin: string;
}

export class BankAccount {
    accountNumber: string;
    bankCode: string;
}

export class CountryContext {
    currency: string;
    currencyShortName: string;
    currencyCode: string;
    countryId: number;
    countryName: string;
    shortName: string;
    countryCode: string;
    currencyId: number;
    flag: string;
}

export class ListCountriesResponse extends Response {
    countries: CountryContext[];
}

export class Locations {
    id: number;
    name: string;
    location_code: string;
    description: string;
}