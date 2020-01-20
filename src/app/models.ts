export class Response {
    statusCode: string;
    statusMessage: string;
}

export class LoginRequest {
    email: string;
    password: string;
}

export class LoginResponse extends Response {
    details: UserContext;
}

export class UserContext {
    customerInformationId: number;
    customerId: number;
    customerTypeId: number;
    customerType: string;
    username: string;
    password: string;
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
    dateCreated: Date;
    customerImage: string;
    statusId: number;
    status: string;
    customerLimit: number;
    customerUploads: string[];
}

export class ListUserResponse extends Response {
    users: UserContext[];
}

export class UserResponse extends Response {
    details: UserContext;
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
    walletId: number;
    walletNumber: number;
    description: string;
    customerId: number;
    availableBalance: number;
    ledgetBalance: number;
    dateCreated: Date;
    statusId: number;
    walletType: string;
}

export class walletResponse extends Response {
    wallets: WalletContext[];
}

export class FundWalletRequest {
    referenceNo: string;
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