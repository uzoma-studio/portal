import { space } from "postcss/lib/list";
import { getCurrentSpace } from "../../../../data/fetchContent.server";

export async function generateMetadata({ params }) {
    const spaceDomain = (await params).space
    const { name } = await getCurrentSpace(spaceDomain)

    return {
        title: name,
        description: `${space.name} is on Portal, a webspace builder for creative people`
    }
}

export default function RootLayout({ children }) {
    return (
        <>{children}</>
    );
  }