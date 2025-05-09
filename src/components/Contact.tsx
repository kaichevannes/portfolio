import { styled } from '@linaria/react';
import React, { CSSProperties } from 'react';
import { Form } from 'radix-ui';

import { WEIGHTS, QUERIES } from '@/constants';

import Mail from '@/svg/mail.svg';
import MailSquiggly from '@/svg/mail-squiggly.svg';
import LinkedIn from '@/svg/linkedin.svg';
import LinkedInSquiggly from '@/svg/linkedin-squiggly.svg';

import { Heading } from '@/components/Heading';

const Contact = () => {
  const [sentMessage, setSentMessage] = React.useState(false);

  return (
    <Div id='contact'>
      <Heading>Contact</Heading>
      <Wrapper>
        <Socials>
          <H3>Let's talk</H3>
          <SocialList>
            <Social href='mailto:chevannes.kai@gmail.com'>
              <IconWrapper>
                <Mail width={30} height={30} />
              </IconWrapper>
              <TextWrapper>
                chevannes.kai@gmail.com
                <SquigglyWrapper style={{ '--bottom-distance': '-1px' } as CSSProperties}>
                  <MailSquiggly width='100%' height='100%' />
                </SquigglyWrapper>
              </TextWrapper>
            </Social>
            <Social href='https://www.linkedin.com/in/kaichevannes/'>
              <IconWrapper>
                <LinkedIn width={27} height={30} style={{ transform: 'translateX(1.5px)', marginRight: '3px' } as CSSProperties} />
              </IconWrapper>
              <TextWrapper>
                kaichevannes
                <SquigglyWrapper style={{ '--bottom-distance': '1px' } as CSSProperties}>
                  <LinkedInSquiggly width='100%' height='100%' />
                </SquigglyWrapper>
              </TextWrapper>
            </Social>
          </SocialList>
        </Socials>
        <ContactFormWrapper>
          <ContactForm
            onSubmit={
              async (event) => {
                event.preventDefault();
                const data = Object.fromEntries(new FormData(event.currentTarget));
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                if (res.ok) {
                  setSentMessage(true);
                } else {
                  alert("There was an issue sending your message. Try emailing me directly.")
                }
              }
            }
          >
            <Field name='name' style={{ gridArea: 'name' }}>
              <LabelWrapper>
                <Label>Name</Label>
              </LabelWrapper>
              <Form.Control asChild>
                <Input placeholder='Bill Palmer' />
              </Form.Control>
            </Field>
            <Field name='email' style={{ gridArea: 'email' }}>
              <LabelWrapper>
                <Label>Email</Label>
                <FormMessage match='valueMissing'>
                  Please enter your email
                </FormMessage>
                <FormMessage match='typeMismatch'>
                  Please provide a valid email
                </FormMessage>
              </LabelWrapper>
              <Form.Control asChild>
                <Input placeholder='bill.palmer@partsunlimited.com' type='email' required />
              </Form.Control>
            </Field>
            <MessageField name='message' style={{ gridArea: 'message' }}>
              <LabelWrapper>
                <Label>Message</Label>
                <FormMessage match='valueMissing'>
                  Please enter a message
                </FormMessage>
              </LabelWrapper>
              <Form.Control asChild>
                <TextArea placeholder='I’d like to invite you to the Phoenix Team. Let’s chat.' required />
              </Form.Control>
            </MessageField>
            {!sentMessage ?
              <Form.Submit asChild>
                <Send>Send</Send>
              </Form.Submit> :
              'Sent, Thanks for getting touch!'
            }
          </ContactForm>
        </ContactFormWrapper>
      </Wrapper>
    </Div >
  );
}

const Div = styled.div`
  scroll-margin-top: 72px;
`;

const H3 = styled.h3`
  font-size: ${32 / 16}rem;
  color: var(--color-grey900);
  // Optical alignment with the contact form
  margin-bottom: -4px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;

  @media ${QUERIES.tabletAndDown} {
    flex-direction: column;
    gap: 32px;
  }
`;

const Socials = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  color: var(--color-grey700);
`;

const SocialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media ${QUERIES.tabletAndDown} {
    margin-top: 8px;
    gap: 8px;
  }
`;

const Social = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${20 / 16}rem;
`;

const IconWrapper = styled.div`
  transform: translateY(1px);
`;

const TextWrapper = styled.div`
  position: relative;
  font-weight: ${WEIGHTS.medium}
`;

const SquigglyWrapper = styled.div`
  position: absolute;
  bottom: var(--bottom-distance);
`;

const ContactFormWrapper = styled.div`
  flex: 6;
  container-type: inline-size;
  box-shadow: var(--shadow);
  border-radius: 16px;

  @media ${QUERIES.tabletAndDown} {
    flex-basis: 376px;
    width: 100%;
  }
`;

const ContactForm = styled(Form.Root)`
  height: 376px;
  border: 2px solid var(--color-grey700);
  border-radius: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "name email" \ "message message" \ "send send";
  padding: 8px 16px;

  @container (max-width: 600px) {
    height: calc(376px + 80px);
    grid-template-rows: auto auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas: "name" \ "email" \ "message" \ "send";
  }
`;

const Field = styled(Form.Field)`
  padding: 8px;
`;

const MessageField = styled(Field)`
  display: flex;
  flex-direction: column;
`;

const FormMessage = styled(Form.Message)`
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  font-color: var(--color-grey500);
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Label = styled(Form.Label)`
  display: block;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.semibold};
  color: var(--color-grey900);
`;

const Input = styled.input`
  width: 100%;
  background: none;
  border: none;
  border-bottom: 2px solid var(--color-grey700);
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: inherit;
`;

const TextArea = styled.textarea`
  background: none;
  border: 2px solid var(--color-grey700);
  border-radius: 8px;
  flex: 1;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  resize: none;
  color: inherit;
`;

const Send = styled.button`
  grid-area: send;
  margin: 8px;
  text-decoration: none;
  background: var(--color-text);
  color: var(--color-background);
  border: none;
  width: fit-content;
  padding: 4px 16px;
  border-radius: 4px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  width: 135px;

  &:hover {
    background: var(--color-primary);
  }

  @media ${QUERIES.tabletAndDown} {
    width: calc(100% - 16px);
  }
`;

export { Contact };
