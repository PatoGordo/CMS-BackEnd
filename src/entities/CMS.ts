import { Schema, model } from "mongoose";

interface ICMS {
  id?: string;
  name: string;
  owner_id: string;
  authorized_urls?: Array<unknown>;
  structure: any;
  data?: Array<unknown>;
  api_key?: string;
}

const cmsSchema = new Schema<ICMS>(
  {
    name: { type: String, required: true },
    owner_id: { type: String, required: true },
    authorized_urls: { type: Array, required: true },
    api_key: { type: String, required: true },
    data: { type: Array, required: true },
    structure: { type: Object, required: true }
  },
  {
    timestamps: true
  }
);

const CMS = model<ICMS>("CMS", cmsSchema);

export { ICMS, CMS };
