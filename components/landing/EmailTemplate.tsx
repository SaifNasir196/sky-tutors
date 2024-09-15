import React from 'react';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';


interface EmailTemplateProps {
  sender: string;
  message: string;
}

export default function EmailTemplate({ sender, message }: EmailTemplateProps) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>New Message from Sky Tutors</Text>
          <Text style={paragraph}>
            <strong>Sender:</strong> {sender}
          </Text>
          <Text style={paragraph}>
            <strong>Message:</strong>
          </Text>
          <Text style={paragraph}>{message}</Text>
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const heading = {
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 20px',
};

const paragraph = {
  fontSize: '16px',
  margin: '0 0 20px',
};