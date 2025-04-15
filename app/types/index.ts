export interface QuickFormData {
   phone: string;
   message: string;
}

export interface Step {
   icon: any;
   title: string;
   description: string;
}

export interface Example {
   image: string;
   alt: string;
   title: string;
   description: string;
}

export interface QRData {
   name: string;
   email: string;
   phone: string;
   message: string;
   style: string;
   color: string;
   logo: string | null;
}

export interface QRStyle {
   id: string;
   name: string;
   preview: string;
}

export interface QRColor {
   name: string;
   value: string;
}

export interface QRLogo {
   id: string;
   name: string;
   preview: string;
}

export interface QROptions {
   width: number;
   height: number;
   type: string;
   data: string;
   dotsOptions: {
      color: string;
      type: string;
   };
   cornersSquareOptions: {
      color: string;
      type: string;
   };
   cornersDotOptions: {
      color: string;
      type: string;
   };
   backgroundOptions: {
      color: string;
   };
   imageOptions: {
      crossOrigin: string;
      margin: number;
   };
   image?: string;
}
