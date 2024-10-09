// src/@types/formidable.d.ts

declare module 'formidable' {
    import { IncomingForm as FormidableIncomingForm } from 'formidable';
    export { FormidableIncomingForm as IncomingForm };
}
