import { PaginationInput, PaginationResponse, SuccessResponse } from "types";
import http from "..";
import {
  Contact,
  ContactInput,
  Faq,
  FaqInput,
  Feedback,
  ProfileImages,
  ProfileImagesInput,
  TermsOfService,
  TermsOfServiceInput,
} from "./types";

export const keys = {
  terms: "terms",
  faq: "faq",
  language: "language",
  commission: "commission",
  subscription: "subscription",
  avatars: "avatars",
  faqCustomer: "faq_customer",
};

namespace settings {
  export const get = <T>(key: string) => {
    if (!key) return;
    const res = http.get<T>(`admin/settings/config/get/${key}`, {
      hasAuth: true,
    });
    return res;
  };
  export const set = <T>(key: string, body: T) => {
    return http.put<SuccessResponse>(`admin/settings/config/set/${key}`, {
      body: {
        key,
        type: "JSON",
        value: JSON.stringify(body),
      },
      hasAuth: true,
    });
  };

  export const getTerms = () =>
    http.get<TermsOfService>("admin/settings/terms_of_service/get", {
      hasAuth: true,
    });

  export const setTerms = (body: TermsOfServiceInput) =>
    http.post<SuccessResponse>("admin/settings/terms_of_service/set", {
      body,
      hasAuth: true,
    });

  export const getProfileImages = () =>
    http.get<ProfileImages>("admin/settings/profile_images/get", {
      hasAuth: true,
    });

  export const setProfileImages = (body: ProfileImagesInput) =>
    http.post<SuccessResponse>("admin/settings/profile_images/set", {
      hasAuth: true,
      body,
    });
  export const listFaqs = () =>
    http.get<Faq[]>("admin/settings/faq/list", {
      hasAuth: true,
    });

  export const createFaq = (body: FaqInput) =>
    http.post<SuccessResponse>("admin/settings/faq/create", {
      hasAuth: true,
      body,
    });

  export const updateFaq = (id: number, body: Faq) =>
    http.put<SuccessResponse>(`admin/settings/faq/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const deleteFaq = (id: number) =>
    http.del<SuccessResponse>(`admin/settings/faq/delete/${id}`, {
      hasAuth: true,
    });

  export const listContact = () =>
    http.get<Contact[]>("admin/settings/contact/list", {
      hasAuth: true,
    });

  export const createContact = (body: ContactInput) =>
    http.post<SuccessResponse>("admin/settings/contact/create", {
      hasAuth: true,
      body,
    });

  export const updateContact = (id: number, body: ContactInput) =>
    http.put<SuccessResponse>(`admin/settings/contact/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const deleteContact = (id: number) =>
    http.del<SuccessResponse>(`admin/settings/contact/delete/${id}`, {
      hasAuth: true,
    });

  export const feedbackList = (body: PaginationInput) =>
    http.post<PaginationResponse<Feedback>>("admin/settings/feedback/list", {
      hasAuth: true,
      body,
    });
}

export default settings;
