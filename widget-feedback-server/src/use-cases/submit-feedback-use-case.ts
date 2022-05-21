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
                `<div style="font-family: Monospace; font-size: 16px; color: #111">`,
                `<h1>Next Level Week Widget application</h1>`,
                `<br>`,
                `<br>`,
                `<h3>Good guy, you received a new e-mail, check out rigth now</h3>`,
                `<br>`,
                `<div">`,
                `<p style="width: 50%"><strong>Comment Type:</strong> ${type}</p>`,                              
                `<p><strong>Comment:</strong> ${comment}</p>`,
                `<p><strong>Screenshot taken from the website:</strong></p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `<div>`,
                `<p>Best regards,</p>`,
                `<div>`
            ].join('')            
        });
    }
}