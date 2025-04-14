<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

// 컴포넌트가 마운트될 때 자동으로 이메일 인증 요청
onMounted(async () => {
  const uuid = route.params.uuid;
  if (uuid) {
    try {
      const response = await axios.get(`/api/user/email_verify/${uuid}`);
      if (response.data === true) {
        alert("인증이 완료되었습니다.");
        router.push("/login");
      } else {
        alert("이미 인증되었거나 잘못된 요청입니다.");
        router.push("/login");
      }
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증 중 오류가 발생했습니다.");
      router.push("/login");
    }
  }
});
</script>