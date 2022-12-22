import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';

import {MatBadgeModule} from '@angular/material/badge';

const materials = [
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule,
 ReactiveFormsModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,

  MatBadgeModule
]

@NgModule({
  imports: [
    materials
      ],
      exports:[
        materials
      ]
})
export class MaterialModule { }
