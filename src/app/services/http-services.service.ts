import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CardContext, Response, TransactionResponse, UserResponse, LoginRequest, RegisterRequest, LoginResponse, ListCardResponse, walletResponse, WalletContext, FundWalletRequest, AddWalletRequst, UserContext, ListCountriesResponse, UserData } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  client_id = 'b458624f-2474-4f00-9131-80941cb60c2c';
  client_secret = 'U3fU4bU1iV5cQ4iC0oC2oP5jD3aW4wQ3sX5iR5nB1bQ8uC7lG4';
  headers: HttpHeaders = new HttpHeaders();
  headers2: HttpHeaders = new HttpHeaders();
  apikey2 = 'ws4kc0sgw8k084o8kkswwwkw8s0c4wgows8k4w8s';


  constructor(private http: HttpClient) { 
    // Header to Wondo APIC Portal
    this.headers = this.headers.append('Accept', 'application/json');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('x-ibm-client-id', this.client_id);
    this.headers = this.headers.append('x-ibm-client-secret', this.client_secret);

    // Header for Wondo Api
    this.headers2 = this.headers.append('x-api-key', this.apikey2);
    this.headers2 = this.headers.append('Accept', 'application/json');
    this.headers2 = this.headers.append('Content-Type', 'application/json');
  }

  Login(request: LoginRequest){
    return this.http.post<LoginResponse>(environment.api_url + 'authentication/login', request, {headers: this.headers});
  }

  Login2(request: LoginRequest){
    return this.http.post<UserData>(environment.api_url2 + 'authenticateresident', request, {headers: this.headers2});
  }

  Register(request: RegisterRequest){
    return this.http.post<Response>(environment.api_url + 'authentication/register', request, {headers: this.headers})
  }

  GetCustomerDetail(userId: number){
    return this.http.get<LoginResponse>(environment.api_url + 'customers/Information/' + userId, {headers: this.headers});
  }

  UpdateCustomerDetails(request: UserContext){
    return this.http.put<Response>(environment.api_url + 'customers', request, {headers: this.headers});
  }

  GetCustomerCards(userId: number){
    return this.http.get<ListCardResponse>('http://176.58.116.80/api/' + 'cards/customer/' + userId, {headers: this.headers});
  }

  AddCard(request: CardContext){
    return this.http.post<Response>('http://176.58.116.80/api/' + 'cards', request, {headers: this.headers})
  }

  GetCustomerTransactions(userId: number){
    return this.http.get<TransactionResponse>('http://176.58.116.80/api/' + 'transactions/customer/' + userId, {headers: this.headers});
  }

  GetCustomerWallets(userId: number){
    return this.http.get<walletResponse>(environment.api_url + 'wallets/customer/' + userId, {headers: this.headers});
  }

  AddWallet(request: AddWalletRequst){
    return this.http.post<Response>('http://176.58.116.80/api/' + 'wallets', request, {headers: this.headers})
  }

  FundWallet(request: FundWalletRequest){
    return this.http.put<Response>('http://176.58.116.80/api/' + 'wallets/fund', request, {headers: this.headers})
  }

  GetCountries(){
    return this.http.get<ListCountriesResponse>(environment.api_url + 'countries', {headers: this.headers});
  }
}
