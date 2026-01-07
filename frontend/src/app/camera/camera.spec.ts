import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Camera } from './camera';

describe('Camera', () => {
  let component: Camera;
  let fixture: ComponentFixture<Camera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camera],
    }).compileComponents();

    fixture = TestBed.createComponent(Camera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('soll ein Foto hinzufügen und File[] emitten', () => {
    spyOn(component.photosTaken, 'emit');

    const file = new File([new Blob()], 'test.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file],
        value: '',
      },
    } as unknown as Event;

    component.onFileChange(event);

    expect(component.selectedFiles.length).toBe(1);
    expect(component.selectedFiles[0]).toBe(file);
    expect(component.photosTaken.emit).toHaveBeenCalledWith([file]);
  });

  it('soll ein Foto entfernen und aktualisiertes Array emitten', () => {
    spyOn(component.photosTaken, 'emit');

    const file1 = new File([new Blob()], 'a.png');
    const file2 = new File([new Blob()], 'b.png');

    component.selectedFiles = [file1, file2];
    component.previewUrls = ['url1', 'url2'];

    component.removePhoto(0);

    expect(component.selectedFiles).toEqual([file2]);
    expect(component.previewUrls.length).toBe(1);
    expect(component.photosTaken.emit).toHaveBeenCalledWith([file2]);
  });

  it('soll nichts tun, wenn keine Datei ausgewählt wird', () => {
    spyOn(component.photosTaken, 'emit');

    const event = { target: { files: [] } } as unknown as Event;
    component.onFileChange(event);

    expect(component.selectedFiles.length).toBe(0);
    expect(component.photosTaken.emit).not.toHaveBeenCalled();
  });
});
