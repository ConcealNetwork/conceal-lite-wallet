// Angular
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { HelperService } from '../../../services/helper.service';
import { DataService } from '../../../services/data.service';

@Component({
	selector: 'app-export',
	templateUrl: './export.dialog.html',
	styleUrls: ['./export.dialog.scss'],
  animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class ExportKeysDialog {

	form: FormGroup = new FormGroup({
		twofaFormControl: new FormControl('', [
		Validators.minLength(6),
		Validators.maxLength(6),
			Validators.pattern('^[0-9]*$'),
			Validators.required,
		])
	});

	constructor (
		private helperService: HelperService,
		private dataService: DataService,
		public dialogRef: MatDialogRef<ExportKeysDialog>,	@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	getDataService() {
		return this.dataService;
	}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.helperService.getWalletKeys(this.data, this.form.value.twofaFormControl);
		}
	}

	close() {
		this.dialogRef.close(true);
	}

}