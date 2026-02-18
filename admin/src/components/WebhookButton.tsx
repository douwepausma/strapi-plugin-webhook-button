import { Button } from "@strapi/design-system";
import * as icons from "@strapi/icons";
import { useState } from "react";
import { buttonSchema } from "../../../server/src/schema";
import { unstable_useContentManagerContext as useContentManagerContext } from "@strapi/strapi/admin";
import z from "zod";
import { Alert } from "@strapi/design-system";
import { Portal } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";

type ContentManagerData = ReturnType<typeof useContentManagerContext>;
type ButtonConfig = z.infer<typeof buttonSchema>;

export default function WebhookButton(props: ButtonConfig) {
    const data = useContentManagerContext() as ContentManagerData & { form: { values: Record<string, any> } };;
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ variant: 'success' | 'danger', message: string } | null>(null);

    const handleClick = () => {
        setLoading(true);

        fetch('/webhook-button/execute', {
            method: 'POST',
            body: JSON.stringify({
                buttonConfig: props,
                entry: {
                    contentType: data?.contentType,
                    values: data?.form?.values
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setAlert({ variant: 'success', message: 'Webhook executed successfully' });
        })
        .catch(error => {
            console.error('Error:', error);
            setAlert({ variant: 'danger', message: 'Failed to execute webhook' });
        })
        .finally(() => {
            setLoading(false);
            setTimeout(() => setAlert(null), 3000);
        });
    };

    // @ts-ignore
    const IconComponent = props.icon ? (icons as any)[props.icon] : null;

    return (
        <>
            {alert && (
                <Portal>
                    <Flex padding={6} justifyContent="center" alignItems="center" style={{position: 'absolute', top: 0, left: 0, zIndex: 700, width: '100%'}}>
                        <Alert variant={alert.variant} onClose={() => setAlert(null)} style={{ maxWidth: '700px' }}>
                            {alert.message}
                        </Alert>
                    </Flex>
                </Portal>
            )}
            <Button variant={props.variant || 'secondary'} loading={loading} onClick={handleClick} startIcon={IconComponent ? <IconComponent /> : undefined}>
                {props.name}
            </Button>
        </>
    );
}