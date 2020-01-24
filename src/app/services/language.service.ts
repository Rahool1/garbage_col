import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from './auth-service.service';
@Injectable({
    providedIn: 'root'
})
export class LanguageService implements OnInit {
    user;
    langVariables = {
        "complaint": "",
        "add_complaint": "",
        "inprogress": "",
        "completed": "",
        "rejected": "",
        "select_language": "",
        "logout": "",
        "SUPERVISOR": "",
        "no_record_found": "",
        "register_complaint": "",
        "select_ward": "",
        "select_sub_ward": "",
        "title": "",
        "address": "",
        "description": "",
        "mobile_no": "",
        "ward": "",
        "sub_ward": "",
        "status": "",
        "CUSTOMER": "",
        "ADMIN": ""
    }

    constructor(
        private _translate: TranslateService,
        private authService: AuthServiceService
    ) { }

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        })
    }
    _initialiseTranslation(): void {
        this._translate.get('complaint').subscribe((res: string) => {
            this.langVariables.complaint = res;
        });
        this._translate.get('add_complaint').subscribe((res: string) => {
            this.langVariables.add_complaint = res;
        });
        this._translate.get('inprogress').subscribe((res: string) => {
            this.langVariables.inprogress = res;
        });
        this._translate.get('completed').subscribe((res: string) => {
            this.langVariables.completed = res;
        });
        this._translate.get('rejected').subscribe((res: string) => {
            this.langVariables.rejected = res;
        });
        this._translate.get('select_language').subscribe((res: string) => {
            this.langVariables.select_language = res;
        });
        this._translate.get('logout').subscribe((res: string) => {
            this.langVariables.logout = res;
        });
        this._translate.get('supervisor').subscribe((res: string) => {
            this.langVariables.SUPERVISOR = res;
        });
        this._translate.get('no_record_found').subscribe((res: string) => {
            this.langVariables.no_record_found = res;
        });
        this._translate.get('register_complaint').subscribe((res: string) => {
            this.langVariables.register_complaint = res;
        });
        this._translate.get('select_ward').subscribe((res: string) => {
            this.langVariables.select_ward = res;
        });
        this._translate.get('select_sub_ward').subscribe((res: string) => {
            this.langVariables.select_sub_ward = res;
        });
        this._translate.get('title').subscribe((res: string) => {
            this.langVariables.title = res;
        });
        this._translate.get('address').subscribe((res: string) => {
            this.langVariables.address = res;
        });
        this._translate.get('description').subscribe((res: string) => {
            this.langVariables.description = res;
        });
        this._translate.get('mobile_no').subscribe((res: string) => {
            this.langVariables.mobile_no = res;
        });
        this._translate.get('ward').subscribe((res: string) => {
            this.langVariables.ward = res;
        });
        this._translate.get('sub_ward').subscribe((res: string) => {
            this.langVariables.sub_ward = res;
        });
        this._translate.get('status').subscribe((res: string) => {
            this.langVariables.status = res;
        });
        this._translate.get('customer').subscribe((res: string) => {
            this.langVariables.CUSTOMER = res;
        });
        this._translate.get('admin').subscribe((res: string) => {
            this.langVariables.ADMIN = res;
        });
    }

    _translateLanguage(language): void {
        this._translate.use(language);
        this._initialiseTranslation();
    }

    _initTranslate() {
        this._translate.setDefaultLang('en');
        let language;
        if (this._translate.getBrowserLang() !== undefined) {
            language = this._translate.getBrowserLang();
            console.log('browser language is', this._translate.getBrowserLang());
        }
        else {
            language = this.user.language;
        }
        this._translateLanguage(language);
    }
}
