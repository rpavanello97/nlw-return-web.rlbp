import { MailAdapter, SendMailData } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string,
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        /* Validations */
        if (!type) {
            throw new Error('Type is required.'); 
        }
        if (!comment) {
            throw new Error('Comment is required.'); 
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');            
        }

        /* External calls*/
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: 'New feedback from website',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Feedback type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `<div>`
            ].join('') 
        });
    }
}