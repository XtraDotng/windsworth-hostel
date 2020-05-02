import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CardContext, Response, TransactionResponse, LoginRequest, RegisterRequest, LoginResponse, ListCardResponse, walletResponse, WalletContext, FundWalletRequest, AddWalletRequst, ListCountriesResponse, Students, Locations, Payments, AddCardRequest, PaymentDetails } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  // client_id = 'b458624f-2474-4f00-9131-80941cb60c2c';
  // client_secret = 'U3fU4bU1iV5cQ4iC0oC2oP5jD3aW4wQ3sX5iR5nB1bQ8uC7lG4';
  // headers: HttpHeaders = new HttpHeaders();
  // headers2: HttpHeaders = new HttpHeaders();
  // apikey2 = 'ws4kc0sgw8k084o8kkswwwkw8s0c4wgows8k4w8s';


  constructor(private http: HttpClient) { 
    // Header to Wondo APIC Portal
    // this.headers = this.headers.append('Accept', 'application/json');
    // this.headers = this.headers.append('Content-Type', 'application/json');
    // this.headers = this.headers.append('x-ibm-client-id', this.client_id);
    // this.headers = this.headers.append('x-ibm-client-secret', this.client_secret);

    // Header for Wondo Api
    // this.headers2 = this.headers2.append('x-api-key', this.apikey2);
    // this.headers2 = this.headers2.append('Accept', 'application/json');
    // this.headers2 = this.headers2.append('Content-Type', 'application/json');
  }

  GetStudentDetailById(id: number){
    return this.http.get<Students>(environment.api_url + 'WindsWorth/Students/' + id);
  }

  GetStudentDetailByStudentId(student_id: number){
    return this.http.get<Students>(environment.api_url + 'WindsWorth/Students/StudentId' + student_id);
  }

  UpdateCustomerDetails(request: Students){
    return this.http.put<Response>(environment.api_url + 'customers', request);
  }

  GetCustomerCards(userId: number){
    return this.http.get<ListCardResponse>(environment.api_url + 'cards/customer/' + userId);
  }

  AddCard(request: AddCardRequest){
    return this.http.post<Response>(environment.api_url + 'cards', request)
  }

  GetCustomerTransactions(userId: number){
    return this.http.get<TransactionResponse>(environment.api_url + 'transactions/customer/' + userId);
  }

  GetCustomerWallets(student_id: string){
    return this.http.get<WalletContext[]>(environment.api_url + 'WindsWorth/StudentWallets/student/' + student_id);
  }

  AddWallet(request: WalletContext){
    return this.http.post<Response>(environment.api_url + 'WindsWorth/studentwallets', request);
  }

  UpdateWallet(request: WalletContext){
    return this.http.put<Response>(environment.api_url + 'WindsWorth/studentwallets', request);
  }

  FundWallet(request: FundWalletRequest){
    return this.http.put<Response>(environment.api_url + 'wallets/fund', request);
  }

  GetCountries(){
    return this.http.get<ListCountriesResponse>(environment.api_url + 'countries');
  }

  GetLocations(){
    return this.http.get<Locations[]>(environment.api_url + 'WindsWorth/Locations');
  }

  GetPaymentsByStudentId(student_id: string){
    return this.http.get<Payments[]>(environment.api_url + "WindsWorth/Payments/StudentId/" + student_id);
  }

  GetPaymentById = (payment_id: string) => {
    return this.http.get<Payments>(environment.api_url + 'WindsWorth/Payments/' + payment_id);
  }

  AddPayment = (request: Payments) => {
    return this.http.post<Response>(environment.api_url + 'WindsWorth/Payments', request);
  }

  AddPaymentDetails = (request: PaymentDetails) => {
    return this.http.post<Response>(environment.api_url + 'WindsWorth/PaymentDetails', request);
  }

  GenerateReference(){
    return Math.random().toString(36).replace('0.', '');
  }
}
