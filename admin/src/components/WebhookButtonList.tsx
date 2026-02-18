import { Flex } from "@strapi/design-system";
import { unstable_useContentManagerContext as useContentManagerContext } from "@strapi/strapi/admin";
import { useEffect, useState } from "react";
import z from "zod";
import { buttonSchema } from "../../../server/src/schema";
import WebhookButton from "./WebhookButton";

type ContentManagerData = ReturnType<typeof useContentManagerContext>;
type ButtonConfig = z.infer<typeof buttonSchema> & { body?: (data: ContentManagerData) => Record<string, any> };

export default function WebhookButtonList() {
    const [buttons, setButtons] = useState<ButtonConfig[]>([]);
    const [config, setConfig] = useState<{ cardTitle?: string }>({});
    const { contentType } = useContentManagerContext();

    const fetchConfig = async () => {
        try {
            const response = await fetch('/webhook-button/config');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setConfig(data);

            if (data?.buttons.length) {
                const parsedButtons = data.buttons.filter((button: ButtonConfig) => !button.models?.length || (!!contentType && button.models.includes(contentType.uid)));

                setButtons(parsedButtons);
            }
        } catch (error) {
            console.error('Failed to fetch config:', error);
        }
    }

    useEffect(() => {
        fetchConfig();
    }, []);

    if (!buttons.length) return null;

    return {
        title: config.cardTitle,
        content: (
            <Flex direction="column" alignItems="stretch" gap={2} width="100%">
                {buttons.map((button, index) => <WebhookButton key={index} {...button} />)}
            </Flex>
        )
    };
}