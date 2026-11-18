import { CourseFeeGuide, feeGuideMetadata } from "@/components/courses/course-fee-guide";

export const metadata = feeGuideMetadata("ur");

export default function FeeGuidePage() {
  return <CourseFeeGuide language="ur" />;
}
